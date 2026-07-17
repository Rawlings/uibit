use oxc_ast::ast::{Class, Expression, PropertyKey};
use oxc_ast::Trivias;

pub fn get_comment_before_span(span_start: u32, min_span: u32, trivias: &Trivias, source_code: &str) -> Option<String> {
  let mut closest_comment = None;
  let mut closest_distance = u32::MAX;

  for (kind, span) in trivias.comments() {
    let kind_str = format!("{:?}", kind);
    if (kind_str == "Block" || kind_str == "MultiLine") && span.end <= span_start && span.start >= min_span {
      let distance = span_start - span.end;
      if distance < closest_distance {
        closest_distance = distance;
        closest_comment = Some(source_code[span.start as usize..span.end as usize].to_string());
      }
    }
  }

  closest_comment
}

pub fn get_key_name(key: &PropertyKey) -> String {
  match key {
    PropertyKey::StaticIdentifier(ident) => ident.name.to_string(),
    PropertyKey::Identifier(ident) => ident.name.to_string(),
    PropertyKey::PrivateIdentifier(ident) => ident.name.to_string(),
    _ => "".to_string(),
  }
}

pub fn get_decorator_value(class: &Class, decorator_name: &str) -> Option<String> {
  for decorator in &class.decorators {
    if let Expression::CallExpression(call) = &decorator.expression {
      if let Expression::Identifier(ident) = &call.callee {
        if ident.name == decorator_name {
          if let Some(first_arg) = call.arguments.first() {
            if let Some(Expression::StringLiteral(str_lit)) = first_arg.as_expression() {
              return Some(str_lit.value.to_string());
            }
          }
        }
      }
    }
  }
  None
}

pub fn get_stencil_tag_name(class: &Class) -> Option<String> {
  for decorator in &class.decorators {
    if let Expression::CallExpression(call) = &decorator.expression {
      if let Expression::Identifier(ident) = &call.callee {
        if ident.name == "Component" {
          if let Some(first_arg) = call.arguments.first() {
            if let Some(Expression::ObjectExpression(obj)) = first_arg.as_expression() {
              for property in &obj.properties {
                if let oxc_ast::ast::ObjectPropertyKind::ObjectProperty(p) = property {
                  if get_key_name(&p.key) == "tag" {
                    if let Expression::StringLiteral(str_lit) = &p.value {
                      return Some(str_lit.value.to_string());
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
  None
}

pub fn has_decorator(class: &Class, name: &str) -> bool {
  for decorator in &class.decorators {
    let expr = &decorator.expression;
    if let Expression::Identifier(ident) = expr {
      if ident.name == name {
        return true;
      }
    } else if let Expression::CallExpression(call) = expr {
      if let Expression::Identifier(ident) = &call.callee {
        if ident.name == name {
          return true;
        }
      }
    }
  }
  false
}
