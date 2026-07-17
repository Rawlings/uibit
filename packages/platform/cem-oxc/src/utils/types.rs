use serde::Serialize;

#[derive(Serialize, Clone, Debug)]
pub struct SuperclassInfo {
  pub name: String,
  pub module: Option<String>,
}

#[derive(Serialize, Clone, Debug)]
pub struct AttributeInfo {
  pub name: String,
  pub description: Option<String>,
  pub r#type: Option<String>,
  pub field_name: Option<String>,
}

#[derive(Serialize, Clone, Debug)]
pub struct EventInfo {
  pub name: String,
  pub description: Option<String>,
  pub r#type: Option<String>,
}

#[derive(Serialize, Clone, Debug)]
pub struct SlotInfo {
  pub name: String,
  pub description: Option<String>,
}

#[derive(Serialize, Clone, Debug)]
pub struct CssPartInfo {
  pub name: String,
  pub description: Option<String>,
}

#[derive(Serialize, Clone, Debug)]
pub struct CssPropertyInfo {
  pub name: String,
  pub description: Option<String>,
  pub r#type: Option<String>,
  pub default: Option<String>,
}

#[derive(Serialize, Clone, Debug)]
pub struct CssStateInfo {
  pub name: String,
  pub description: Option<String>,
}

#[derive(Serialize, Clone, Debug)]
pub struct MemberInfo {
  pub name: String,
  pub kind: String, // "field" or "method"
  pub description: Option<String>,
  pub r#type: Option<String>,
  pub default: Option<String>,
  pub r#static: Option<bool>,
  pub privacy: Option<String>, // "public", "protected", "private"
  pub readonly: Option<bool>,
  pub reflects: Option<bool>,
  pub attribute: Option<String>,
}

#[derive(Serialize, Clone, Debug)]
pub struct CustomElementInfo {
  pub kind: String, // "class"
  pub name: String,
  pub tag_name: Option<String>,
  pub description: Option<String>,
  pub summary: Option<String>,
  pub deprecated: Option<String>,
  pub members: Vec<MemberInfo>,
  pub attributes: Vec<AttributeInfo>,
  pub events: Vec<EventInfo>,
  pub slots: Vec<SlotInfo>,
  pub css_parts: Vec<CssPartInfo>,
  pub css_properties: Vec<CssPropertyInfo>,
  pub css_states: Vec<CssStateInfo>,
  pub superclass: Option<SuperclassInfo>,
}
