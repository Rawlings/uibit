#![deny(clippy::all)]

use napi_derive::napi;

mod create;
mod features;
mod utils;

#[napi]
pub fn analyze_source(source_code: String, filename: String) -> String {
  create::analyze_source(&source_code, &filename)
}
