use serde::Serialize;

#[derive(Serialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
pub struct TypeInfo {
  pub text: String,
}

#[derive(Serialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
pub struct ParameterInfo {
  pub name: String,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub r#type: Option<TypeInfo>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub optional: Option<bool>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub description: Option<String>,
}

#[derive(Serialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
pub struct ReturnInfo {
  #[serde(skip_serializing_if = "Option::is_none")]
  pub r#type: Option<TypeInfo>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub description: Option<String>,
}

#[derive(Serialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
pub struct SuperclassInfo {
  pub name: String,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub package: Option<String>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub module: Option<String>,
}

#[derive(Serialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
pub struct AttributeInfo {
  pub name: String,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub description: Option<String>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub r#type: Option<TypeInfo>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub field_name: Option<String>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub default: Option<String>,
}

#[derive(Serialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
pub struct EventInfo {
  pub name: String,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub description: Option<String>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub r#type: Option<TypeInfo>,
}

#[derive(Serialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
pub struct SlotInfo {
  pub name: String,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub description: Option<String>,
}

#[derive(Serialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
pub struct CssPartInfo {
  pub name: String,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub description: Option<String>,
}

#[derive(Serialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
pub struct CssPropertyInfo {
  pub name: String,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub description: Option<String>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub r#type: Option<TypeInfo>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub default: Option<String>,
}

#[derive(Serialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
pub struct CssStateInfo {
  pub name: String,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub description: Option<String>,
}

#[derive(Serialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
pub struct MemberInfo {
  pub name: String,
  pub kind: String, // "field" or "method"
  #[serde(skip_serializing_if = "Option::is_none")]
  pub description: Option<String>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub r#type: Option<TypeInfo>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub default: Option<String>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub r#static: Option<bool>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub privacy: Option<String>, // "public", "protected", "private"
  #[serde(skip_serializing_if = "Option::is_none")]
  pub readonly: Option<bool>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub reflects: Option<bool>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub attribute: Option<String>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub parameters: Option<Vec<ParameterInfo>>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub r#return: Option<ReturnInfo>,
}

#[derive(Serialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
pub struct CustomElementInfo {
  pub kind: String, // "class"
  pub name: String,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub tag_name: Option<String>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub custom_element: Option<bool>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub description: Option<String>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub summary: Option<String>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub deprecated: Option<String>,
  pub members: Vec<MemberInfo>,
  pub attributes: Vec<AttributeInfo>,
  pub events: Vec<EventInfo>,
  pub slots: Vec<SlotInfo>,
  pub css_parts: Vec<CssPartInfo>,
  pub css_properties: Vec<CssPropertyInfo>,
  pub css_states: Vec<CssStateInfo>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub superclass: Option<SuperclassInfo>,
}
