use crate::utils::types::{AttributeInfo, CssPartInfo, CssPropertyInfo, CssStateInfo, CustomElementInfo, EventInfo, MemberInfo, SlotInfo, TypeInfo};

pub struct JSDocTag {
  pub tag: String,
  pub r#type: Option<String>,
  pub name: String,
  pub description: String,
}

pub struct ParsedJSDoc {
  pub description: String,
  pub tags: Vec<JSDocTag>,
}

pub fn parse_jsdoc(comment: &str) -> ParsedJSDoc {
  let mut main_description = String::new();
  let mut tags = Vec::new();
  let mut current_tag: Option<JSDocTag> = None;

  for line in comment.lines() {
    let mut cleaned = line.trim();
    if cleaned.starts_with("/**") {
      cleaned = &cleaned[3..];
    }
    if cleaned.ends_with("*/") {
      cleaned = &cleaned[..cleaned.len() - 2];
    }
    cleaned = cleaned.trim().trim_start_matches('*').trim();

    if cleaned.is_empty() {
      continue;
    }

    if cleaned.starts_with('@') {
      if let Some(tag) = current_tag.take() {
        tags.push(tag);
      }

      let tag_content = &cleaned[1..];
      let mut parts = tag_content.split_whitespace();
      if let Some(tag_name) = parts.next() {
        let remaining = tag_content[tag_name.len()..].trim();
        
        let mut r#type = None;
        let mut rest = remaining;
        if remaining.starts_with('{') {
          let mut brace_count = 0;
          let mut end_idx = None;
          for (i, c) in remaining.chars().enumerate() {
            if c == '{' {
              brace_count += 1;
            } else if c == '}' {
              brace_count -= 1;
              if brace_count == 0 {
                end_idx = Some(i);
                break;
              }
            }
          }
          if let Some(idx) = end_idx {
            r#type = Some(remaining[1..idx].to_string());
            rest = remaining[idx + 1..].trim();
          }
        }

        let mut name = String::new();
        let mut description = String::new();

        if tag_name == "description" || tag_name == "summary" {
          description = rest.to_string();
        } else {
          if let Some(space_idx) = rest.find(' ') {
            name = rest[..space_idx].to_string();
            let desc_part = rest[space_idx + 1..].trim();
            description = desc_part.trim_start_matches('-').trim().to_string();
          } else {
            name = rest.to_string();
          }
        }

        current_tag = Some(JSDocTag {
          tag: tag_name.to_string(),
          r#type,
          name,
          description,
        });
      }
    } else {
      if let Some(ref mut tag) = current_tag {
        if !tag.description.is_empty() {
          tag.description.push('\n');
        }
        tag.description.push_str(cleaned);
      } else {
        if !main_description.is_empty() {
          main_description.push('\n');
        }
        main_description.push_str(cleaned);
      }
    }
  }

  if let Some(tag) = current_tag {
    tags.push(tag);
  }

  ParsedJSDoc {
    description: main_description,
    tags,
  }
}

pub fn map_jsdoc_to_class(jsdoc: ParsedJSDoc, class_info: &mut CustomElementInfo) {
  if !jsdoc.description.is_empty() {
    class_info.description = Some(jsdoc.description);
  }

  for tag in jsdoc.tags {
    match tag.tag.as_str() {
      "element" | "tag" | "tagname" | "customElement" => {
        if !tag.name.is_empty() {
          class_info.tag_name = Some(tag.name);
        }
      }
      "description" => {
        class_info.description = Some(tag.description);
      }
      "summary" => {
        class_info.summary = Some(tag.description);
      }
      "deprecated" => {
        class_info.deprecated = Some(if tag.description.is_empty() { "true".to_string() } else { tag.description });
      }
      "slot" => {
        class_info.slots.push(SlotInfo {
          name: tag.name,
          description: Some(tag.description),
        });
      }
      "fires" | "event" => {
        class_info.events.push(EventInfo {
          name: tag.name,
          description: Some(tag.description),
          r#type: tag.r#type.map(|t| TypeInfo { text: t }),
        });
      }
      "csspart" | "part" => {
        class_info.css_parts.push(CssPartInfo {
          name: tag.name,
          description: Some(tag.description),
        });
      }
      "cssprop" | "cssproperty" => {
        let mut name = tag.name.clone();
        let mut default_val = None;

        if name.starts_with('[') && name.ends_with(']') {
          let inner = name[1..name.len() - 1].to_string();
          if let Some(eq_idx) = inner.find('=') {
            name = inner[..eq_idx].to_string();
            default_val = Some(inner[eq_idx + 1..].to_string());
          } else {
            name = inner;
          }
        }

        class_info.css_properties.push(CssPropertyInfo {
          name,
          description: Some(tag.description),
          r#type: tag.r#type.map(|t| TypeInfo { text: t }),
          default: default_val,
        });
      }
      "cssState" | "cssstate" => {
        class_info.css_states.push(CssStateInfo {
          name: tag.name,
          description: Some(tag.description),
        });
      }
      "attr" | "attribute" => {
        class_info.attributes.push(AttributeInfo {
          name: tag.name,
          description: Some(tag.description),
          r#type: tag.r#type.map(|t| TypeInfo { text: t }),
          field_name: None,
          default: None,
        });
      }
      "prop" | "property" => {
        class_info.members.push(MemberInfo {
          name: tag.name,
          kind: "field".to_string(),
          description: Some(tag.description),
          r#type: tag.r#type.map(|t| TypeInfo { text: t }),
          default: None,
          r#static: None,
          privacy: Some("public".to_string()),
          readonly: None,
          reflects: None,
          attribute: None,
          parameters: None,
          r#return: None,
        });
      }
      _ => {}
    }
  }
}
