use oxc_ast::ast::{Class, ClassElement, Expression, TSAccessibility};
use oxc_ast::Trivias;
use oxc_ast::Visit;
use oxc_span::GetSpan;
use crate::utils::types::{AttributeInfo, CustomElementInfo, EventInfo, MemberInfo, SuperclassInfo, TypeInfo, ParameterInfo, ReturnInfo};
use crate::utils::ast_helpers::{get_comment_before_span, get_decorator_value, get_key_name, get_stencil_tag_name, has_decorator};
use crate::features::analyse_phase::jsdoc::{parse_jsdoc, map_jsdoc_to_class};

struct EventVisitor {
  events: Vec<EventInfo>,
}

impl<'a> Visit<'a> for EventVisitor {
  fn visit_call_expression(&mut self, call: &oxc_ast::ast::CallExpression<'a>) {
    if let Some(member) = call.callee.as_member_expression() {
      if let Expression::ThisExpression(_) = member.object() {
        if member.static_property_name() == Some("dispatchEvent") {
          for arg in &call.arguments {
            if let oxc_ast::ast::Argument::NewExpression(new_expr) = arg {
              if let Expression::Identifier(ident) = &new_expr.callee {
                if ident.name == "CustomEvent" || ident.name == "Event" {
                  if let Some(first_arg) = new_expr.arguments.first() {
                    if let Some(expr) = first_arg.as_expression() {
                      if let Expression::StringLiteral(str_lit) = expr {
                        self.events.push(EventInfo {
                          name: str_lit.value.to_string(),
                          description: None,
                          r#type: Some(TypeInfo { text: ident.name.to_string() }),
                        });
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

pub struct CemVisitor<'a> {
  pub elements: Vec<CustomElementInfo>,
  pub trivias: &'a Trivias,
  pub source_code: &'a str,
  pub imports: std::collections::HashMap<String, (Option<String>, Option<String>)>,
}

fn get_privacy(accessibility: Option<TSAccessibility>) -> Option<String> {
  match accessibility {
    Some(TSAccessibility::Private) => Some("private".to_string()),
    Some(TSAccessibility::Protected) => Some("protected".to_string()),
    Some(TSAccessibility::Public) => Some("public".to_string()),
    None => Some("public".to_string()),
  }
}

fn camel_to_kebab(s: &str) -> String {
  let mut kebab = String::new();
  for (i, c) in s.chars().enumerate() {
    if c.is_uppercase() {
      if i > 0 {
        kebab.push('-');
      }
      kebab.extend(c.to_lowercase());
    } else {
      kebab.push(c);
    }
  }
  kebab
}

use crate::features::framework_plugins::lit::parse_lit_static_properties;

impl<'a, 'b> Visit<'b> for CemVisitor<'a> {
  fn visit_class(&mut self, class: &Class<'b>) {
    let class_name = class.id.as_ref().map(|id| id.name.to_string()).unwrap_or_default();
    if class_name.is_empty() {
      return;
    }

    let mut tag_name = get_decorator_value(class, "customElement");
    if tag_name.is_none() {
      tag_name = get_stencil_tag_name(class);
    }
    if tag_name.is_none() && has_decorator(class, "controller") {
      tag_name = Some(camel_to_kebab(&class_name).replace("-element", ""));
    }

    let superclass = class.super_class.as_ref().and_then(|super_expr| {
      let superclass_name = if let Expression::Identifier(ident) = super_expr {
        ident.name.to_string()
      } else if let Some(member) = super_expr.as_member_expression() {
        member.static_property_name().unwrap_or_default().to_string()
      } else {
        return None;
      };

      let mut package = None;
      let mut module = None;
      if let Some((pkg, mdl)) = self.imports.get(&superclass_name) {
        package = pkg.clone();
        module = mdl.clone();
      }

      Some(SuperclassInfo {
        name: superclass_name,
        package,
        module,
      })
    });

    let is_custom_element = tag_name.is_some()
      || superclass.as_ref().map_or(false, |s| s.name == "LitElement" || s.name == "UIBitElement");
    let mut class_info = CustomElementInfo {
      kind: "class".to_string(),
      name: class_name,
      tag_name,
      custom_element: if is_custom_element { Some(true) } else { None },
      description: None,
      summary: None,
      deprecated: None,
      members: Vec::new(),
      attributes: Vec::new(),
      events: Vec::new(),
      slots: Vec::new(),
      css_parts: Vec::new(),
      css_properties: Vec::new(),
      css_states: Vec::new(),
      superclass,
    };

    if let Some(raw_jsdoc) = get_comment_before_span(class.span.start, 0, self.trivias, self.source_code) {
      let parsed = parse_jsdoc(&raw_jsdoc);
      map_jsdoc_to_class(parsed, &mut class_info);
    }

    let mut last_member_end = class.body.span.start;

    let link_phase_denylist = [
      "connectedCallback",
      "disconnectedCallback",
      "adoptedCallback",
      "attributeChangedCallback",
      "componentWillLoad",
      "componentDidLoad",
      "componentShouldUpdate",
      "componentWillRender",
      "componentDidRender",
      "componentWillUpdate",
      "componentDidUpdate",
    ];

    // Scan for members (properties, methods, observedAttributes)
    for element in &class.body.body {
      let element_span = match element {
        ClassElement::MethodDefinition(method) => method.span,
        ClassElement::PropertyDefinition(prop) => prop.span,
        ClassElement::AccessorProperty(acc) => acc.span,
        ClassElement::TSIndexSignature(sig) => sig.span,
        ClassElement::StaticBlock(block) => block.span,
      };

      match element {
        ClassElement::MethodDefinition(method) => {
          let name = get_key_name(&method.key);
          if name.is_empty() {
            last_member_end = element_span.end;
            continue;
          }

          // Filter out standard lifecycle methods from link-phase denylist
          if link_phase_denylist.contains(&name.as_str()) {
            last_member_end = element_span.end;
            continue;
          }

          // Check static getter properties
          if method.r#static && name == "properties" {
            if let Some(body) = &method.value.body {
              for stmt in &body.statements {
                if let oxc_ast::ast::Statement::ReturnStatement(ret) = stmt {
                  if let Some(arg) = &ret.argument {
                    if let Expression::ObjectExpression(arr) = arg {
                      parse_lit_static_properties(arr, &mut class_info);
                    }
                  }
                }
              }
            }
            last_member_end = element_span.end;
            continue;
          }

          // Check if it is the static getter "observedAttributes"
          if method.r#static && name == "observedAttributes" {
            if let Some(body) = &method.value.body {
              for stmt in &body.statements {
                if let oxc_ast::ast::Statement::ReturnStatement(ret) = stmt {
                  if let Some(arg) = &ret.argument {
                    if let Expression::ArrayExpression(arr) = arg {
                      for element in &arr.elements {
                        if let Some(el_expr) = element.as_expression() {
                          if let Expression::StringLiteral(str_lit) = el_expr {
                            class_info.attributes.push(AttributeInfo {
                              name: str_lit.value.to_string(),
                              description: None,
                              r#type: Some(TypeInfo { text: "string".to_string() }),
                              field_name: None,
                              default: None,
                            });
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            last_member_end = element_span.end;
            continue;
          }

          let raw_jsdoc = get_comment_before_span(method.span.start, last_member_end, self.trivias, self.source_code);
          let parsed_jsdoc = raw_jsdoc.map(|raw| parse_jsdoc(&raw));

          let description = parsed_jsdoc.as_ref().map(|j| j.description.clone()).filter(|s| !s.is_empty());

          if method.kind == oxc_ast::ast::MethodDefinitionKind::Get {
            let mut prop_type = None;
            if let Some(ret_type) = &method.value.return_type {
              let ret_str = ret_type.type_annotation.span().source_text(self.source_code).trim().to_string();
              prop_type = Some(TypeInfo { text: ret_str });
            }

            class_info.members.push(MemberInfo {
              name,
              kind: "field".to_string(),
              description,
              r#type: prop_type,
              default: None,
              r#static: Some(method.r#static),
              privacy: get_privacy(method.accessibility),
              readonly: Some(true),
              reflects: None,
              attribute: None,
              parameters: None,
              r#return: None,
            });
            last_member_end = element_span.end;
            continue;
          }
          
          let method_fn = &method.value;
          let mut parameters = Vec::new();
          for param in &method_fn.params.items {
            let mut param_name = String::new();
            let mut optional = None;
            let mut param_type = None;

            match &param.pattern.kind {
              oxc_ast::ast::BindingPatternKind::BindingIdentifier(ident) => {
                param_name = ident.name.to_string();
              }
              _ => {}
            }

            if param.pattern.optional {
              optional = Some(true);
            }

            if let Some(type_anno) = &param.pattern.type_annotation {
              let type_str = type_anno.type_annotation.span().source_text(self.source_code).trim().to_string();
              param_type = Some(TypeInfo { text: type_str });
            }

            parameters.push(ParameterInfo {
              name: param_name,
              r#type: param_type,
              optional,
              description: None,
            });
          }

          let mut r#return = None;
          if let Some(ret_type) = &method_fn.return_type {
            let ret_str = ret_type.type_annotation.span().source_text(self.source_code).trim().to_string();
            r#return = Some(ReturnInfo {
              r#type: Some(TypeInfo { text: ret_str }),
              description: None,
            });
          }

          class_info.members.push(MemberInfo {
            name,
            kind: "method".to_string(),
            description,
            r#type: None,
            default: None,
            r#static: Some(method.r#static),
            privacy: get_privacy(method.accessibility),
            readonly: None,
            reflects: None,
            attribute: None,
            parameters: if parameters.is_empty() { None } else { Some(parameters) },
            r#return,
          });

          let mut event_visitor = EventVisitor { events: Vec::new() };
          event_visitor.visit_function(&method.value, None);
          for event in event_visitor.events {
            if !class_info.events.iter().any(|e| e.name == event.name) {
              class_info.events.push(event);
            }
          }
        }
        ClassElement::PropertyDefinition(prop) => {
          let name = get_key_name(&prop.key);
          if name.is_empty() {
            last_member_end = element_span.end;
            continue;
          }

          // Check static properties
          if prop.r#static && name == "properties" {
            if let Some(Expression::ObjectExpression(arr)) = &prop.value {
              parse_lit_static_properties(arr, &mut class_info);
            }
            last_member_end = element_span.end;
            continue;
          }

          // Check if it is a static property "observedAttributes"
          if prop.r#static && name == "observedAttributes" {
            if let Some(Expression::ArrayExpression(arr)) = &prop.value {
              for element in &arr.elements {
                if let Some(el_expr) = element.as_expression() {
                  if let Expression::StringLiteral(str_lit) = el_expr {
                    class_info.attributes.push(AttributeInfo {
                      name: str_lit.value.to_string(),
                      description: None,
                      r#type: Some(TypeInfo { text: "string".to_string() }),
                      field_name: None,
                      default: None,
                    });
                  }
                }
              }
            }
            last_member_end = element_span.end;
            continue;
          }

          let raw_jsdoc = get_comment_before_span(prop.span.start, last_member_end, self.trivias, self.source_code);
          let parsed_jsdoc = raw_jsdoc.map(|raw| parse_jsdoc(&raw));
          let description = parsed_jsdoc.as_ref().map(|j| j.description.clone()).filter(|s| !s.is_empty());

          let mut is_element_property = false;
          let mut attribute_name = None;
          let mut reflects = false;
          let mut is_stencil_event = false;
          let mut stencil_event_name = None;

          let mut decorator_type = None;
          for decorator in &prop.decorators {
            if let Expression::CallExpression(call) = &decorator.expression {
              if let Expression::Identifier(ident) = &call.callee {
                let d_name = ident.name.as_str();
                if d_name == "property" || d_name == "state" || d_name == "attr" || d_name == "Prop" {
                  if d_name != "state" {
                    is_element_property = true;
                  }
                  if let Some(first_arg) = call.arguments.first() {
                    if let Some(expr) = first_arg.as_expression() {
                      if let Expression::ObjectExpression(obj) = expr {
                        for property in &obj.properties {
                          if let oxc_ast::ast::ObjectPropertyKind::ObjectProperty(p) = property {
                            let key_name = get_key_name(&p.key);
                            if key_name == "attribute" {
                              if let Expression::StringLiteral(str_lit) = &p.value {
                                attribute_name = Some(str_lit.value.to_string());
                              } else if let Expression::BooleanLiteral(bool_lit) = &p.value {
                                if !bool_lit.value {
                                  attribute_name = Some("false".to_string());
                                }
                              }
                            } else if key_name == "reflect" || key_name == "reflects" {
                              if let Expression::BooleanLiteral(bool_lit) = &p.value {
                                  reflects = bool_lit.value;
                              }
                            } else if key_name == "type" {
                              if let Expression::Identifier(type_ident) = &p.value {
                                decorator_type = Some(type_ident.name.to_string().to_lowercase());
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } else if d_name == "Event" {
                  is_stencil_event = true;
                  if let Some(first_arg) = call.arguments.first() {
                    if let Some(expr) = first_arg.as_expression() {
                      if let Expression::ObjectExpression(obj) = expr {
                        for property in &obj.properties {
                          if let oxc_ast::ast::ObjectPropertyKind::ObjectProperty(p) = property {
                            if get_key_name(&p.key) == "eventName" {
                              if let Expression::StringLiteral(str_lit) = &p.value {
                                stencil_event_name = Some(str_lit.value.to_string());
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          let mut type_anno_str = None;
          if let Some(type_anno) = &prop.type_annotation {
            type_anno_str = Some(type_anno.type_annotation.span().source_text(self.source_code).trim().to_string());
          } else if let Some(d_type) = decorator_type {
            type_anno_str = Some(d_type);
          }
          let prop_type = type_anno_str.map(|t| TypeInfo { text: t });

          if is_stencil_event {
            let event_name = stencil_event_name.unwrap_or_else(|| name.clone());
            class_info.events.push(EventInfo {
              name: event_name,
              description: description.clone(),
              r#type: Some(TypeInfo { text: "CustomEvent".to_string() }),
            });
            last_member_end = element_span.end;
            continue;
          }

          let default_val = prop.value.as_ref().map(|expr| {
            expr.span().source_text(self.source_code).trim().to_string()
          });

          if is_element_property {
            let attr = if attribute_name.as_deref() == Some("false") {
              None
            } else {
              Some(attribute_name.clone().unwrap_or_else(|| camel_to_kebab(&name)))
            };

            if let Some(attr_name) = attr {
              if !class_info.attributes.iter().any(|a| a.name == attr_name) {
                class_info.attributes.push(AttributeInfo {
                  name: attr_name,
                  description: description.clone(),
                  r#type: prop_type.clone(),
                  field_name: Some(name.clone()),
                  default: default_val.clone(),
                });
              }
            }
          }

          let attr_val = if is_element_property {
            if attribute_name.as_deref() == Some("false") {
              None
            } else {
              Some(attribute_name.clone().unwrap_or_else(|| camel_to_kebab(&name)))
            }
          } else {
            None
          };

          class_info.members.push(MemberInfo {
            name,
            kind: "field".to_string(),
            description,
            r#type: prop_type,
            default: default_val,
            r#static: Some(prop.r#static),
            privacy: get_privacy(prop.accessibility),
            readonly: None,
            reflects: if reflects { Some(true) } else { None },
            attribute: attr_val,
            parameters: None,
            r#return: None,
          });
        }
        _ => {}
      }

      last_member_end = element_span.end;
    }

    self.elements.push(class_info);
  }

  fn visit_import_declaration(&mut self, decl: &oxc_ast::ast::ImportDeclaration<'b>) {
    let source = decl.source.value.to_string();
    let is_package = !source.starts_with('.') && !source.starts_with('/');

    if let Some(specifiers) = &decl.specifiers {
      for specifier in specifiers {
        if let oxc_ast::ast::ImportDeclarationSpecifier::ImportSpecifier(spec) = specifier {
          let local_name = spec.local.name.to_string();
          if is_package {
            self.imports.insert(local_name, (Some(source.clone()), None));
          } else {
            self.imports.insert(local_name, (None, Some(source.clone())));
          }
        }
      }
    }
  }
}
