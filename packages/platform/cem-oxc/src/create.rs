use oxc_allocator::Allocator;
use oxc_parser::Parser;
use oxc_span::SourceType;
use oxc_ast::Visit;
use crate::features::analyse_phase::classes::CemVisitor;

pub fn analyze_source(source_code: &str, file_path: &str) -> String {
  let allocator = Allocator::default();
  let source_type = SourceType::from_path(file_path).unwrap_or_default();
  let parser = Parser::new(&allocator, source_code, source_type);
  let parsed = parser.parse();

  let mut visitor = CemVisitor {
    elements: Vec::new(),
    trivias: &parsed.trivias,
    source_code,
  };
  visitor.visit_program(&parsed.program);

  serde_json::to_string(&visitor.elements).unwrap_or_default()
}
