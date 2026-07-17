use oxc_ast::ast::{Expression, ObjectExpression};
use crate::utils::types::{AttributeInfo, CustomElementInfo, MemberInfo, TypeInfo};
use crate::utils::ast_helpers::get_key_name;

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

pub fn parse_lit_static_properties(obj: &ObjectExpression, class_info: &mut CustomElementInfo) {
  for prop_item in &obj.properties {
    if let oxc_ast::ast::ObjectPropertyKind::ObjectProperty(p) = prop_item {
      let prop_name = get_key_name(&p.key);
      if prop_name.is_empty() {
        continue;
      }

      let mut attribute_name = None;
      let mut type_name = None;

      if let Expression::ObjectExpression(opts) = &p.value {
        for opt_prop in &opts.properties {
          if let oxc_ast::ast::ObjectPropertyKind::ObjectProperty(opt_p) = opt_prop {
            let opt_key = get_key_name(&opt_p.key);
            if opt_key == "attribute" {
              if let Expression::StringLiteral(s) = &opt_p.value {
                attribute_name = Some(s.value.to_string());
              } else if let Expression::BooleanLiteral(b) = &opt_p.value {
                if !b.value {
                  attribute_name = Some("false".to_string());
                }
              }
            } else if opt_key == "type" {
              if let Expression::Identifier(ident) = &opt_p.value {
                type_name = Some(ident.name.to_string());
              }
            }
          }
        }
      }

      if !class_info.members.iter().any(|m| m.name == prop_name) {
        class_info.members.push(MemberInfo {
          name: prop_name.clone(),
          kind: "field".to_string(),
          description: None,
          r#type: type_name.map(|t| TypeInfo { text: t }),
          default: None,
          r#static: Some(false),
          privacy: Some("public".to_string()),
          readonly: None,
          reflects: None,
          attribute: None,
          parameters: None,
          r#return: None,
        });
      }

      if attribute_name.as_deref() != Some("false") {
        let attr_name = attribute_name.unwrap_or_else(|| camel_to_kebab(&prop_name));
        if !class_info.attributes.iter().any(|a| a.name == attr_name) {
          class_info.attributes.push(AttributeInfo {
            name: attr_name,
            description: None,
            r#type: None,
            field_name: Some(prop_name),
            default: None,
          });
        }
      }
    }
  }
}
