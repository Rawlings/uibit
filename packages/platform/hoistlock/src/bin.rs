use std::env;
use std::fs;
use std::path::Path;
use std::process;
use hoistlock::{check_hoisting, HoistlockConfig};

fn main() {
  let args: Vec<String> = env::args().collect();
  let cmd = args.get(1).map(|s| s.as_str()).unwrap_or("check");

  match cmd {
    "init" => {
      let config_path = Path::new("hoistlock.json");
      if config_path.exists() {
        println!("hoistlock.json already exists!");
        return;
      }

      // Default configurations
      let config = HoistlockConfig {
        entry: "./src/main.tsx".to_string(),
        tsconfig: Some("./tsconfig.json".to_string()),
        exclude: Some(vec![
          "**/node_modules/**".to_string(),
          "**/dist/**".to_string(),
          "**/*.spec.*".to_string(),
          "**/*.test.*".to_string(),
        ]),
      };

      if let Ok(content) = serde_json::to_string_pretty(&config) {
        if fs::write(config_path, content).is_ok() {
          println!("Created hoistlock.json with default configurations.");
        } else {
          eprintln!("Failed to write hoistlock.json");
          process::exit(1);
        }
      }
    }
    "check" => {
      let config_path = Path::new("hoistlock.json");
      let config = if config_path.exists() {
        let content = fs::read_to_string(config_path).unwrap_or_default();
        serde_json::from_str(&content).unwrap_or_else(|_| HoistlockConfig {
          entry: "./src/main.tsx".to_string(),
          tsconfig: Some("./tsconfig.json".to_string()),
          exclude: Some(vec![
            "**/node_modules/**".to_string(),
            "**/dist/**".to_string(),
            "**/*.spec.*".to_string(),
            "**/*.test.*".to_string(),
          ]),
        })
      } else {
        // Fallback default
        HoistlockConfig {
          entry: "./src/main.tsx".to_string(),
          tsconfig: Some("./tsconfig.json".to_string()),
          exclude: Some(vec![
            "**/node_modules/**".to_string(),
            "**/dist/**".to_string(),
            "**/*.spec.*".to_string(),
            "**/*.test.*".to_string(),
          ]),
        }
      };

      println!("[hoistlock] Auditing bundle paths starting from entry: {}...", config.entry);
      let start_time = std::time::Instant::now();
      let leaks = check_hoisting(config);
      let duration = start_time.elapsed();
      println!("[hoistlock] Completed audit in {:.2?} ({} ms)", duration, duration.as_millis());

      if leaks.is_empty() {
        println!("\x1b[32m[hoistlock] Pass: No bundle hoisting regressions detected.\x1b[0m");
        process::exit(0);
      } else {
        eprintln!("\x1b[31m[hoistlock] Fail: Accidental bundle hoisting detected! Git commit blocked.\x1b[0m");
        for leak in leaks {
          let file_path = make_relative(&leak.file_path);
          let importer_file = make_relative(&leak.import_path);
          let dynamic_chunk = make_relative(&leak.dynamic_chunk_entry);

          eprintln!(
            "  - Leaked Module: {}\n    Statically imported by: {}\n    Required by dynamic page: {}",
            file_path, importer_file, dynamic_chunk
          );

          if leak.file_path.contains("node_modules") {
            if let Some((pkg_name, suggestion)) = extract_package_and_fix(&leak.file_path, &leak.symbol) {
              eprintln!(
                "    \x1b[33mFix: Change the import of '{}' inside {} to import directly from the sub-path '{}'.\x1b[0m\n",
                pkg_name, importer_file, suggestion
              );
            } else {
              eprintln!(
                "    \x1b[33mFix: Import directly from the specific sub-path (e.g. package/subpath) inside {} instead of the package barrel entry point.\x1b[0m\n",
                importer_file
              );
            }
          } else {
            eprintln!(
              "    \x1b[33mFix: Change the static import of '{}' inside {} to a dynamic `import()` or `lazy()` load.\x1b[0m\n",
              file_path, importer_file
            );
          }
        }
        process::exit(1);
      }
    }
    _ => {
      eprintln!("Unknown command: {}", cmd);
      eprintln!("Available commands: init, check");
      process::exit(1);
    }
  }
}

fn make_relative(path_str: &str) -> String {
  if let Ok(current_dir) = env::current_dir() {
    let current_dir_str = current_dir.to_string_lossy().to_string();
    if path_str.starts_with(&current_dir_str) {
      return path_str[current_dir_str.len()..].trim_start_matches('/').to_string();
    }
  }
  path_str.to_string()
}

fn extract_package_and_fix(file_path: &str, symbol: &str) -> Option<(String, String)> {
  let parts: Vec<&str> = file_path.split("node_modules/").collect();
  if parts.len() < 2 {
    return None;
  }
  let path_after_node_modules = parts.last()?;
  let segments: Vec<&str> = path_after_node_modules.split('/').collect();
  if segments.is_empty() {
    return None;
  }
  
  let package_name = if segments[0].starts_with('@') && segments.len() >= 2 {
    format!("{}/{}", segments[0], segments[1])
  } else {
    segments[0].to_string()
  };
  
  let suggested_symbol = if symbol == "*" || symbol == "default" || symbol.is_empty() {
    "subpath".to_string()
  } else {
    symbol.to_string()
  };
  
  let suggestion = format!("{}/{}", package_name, suggested_symbol);
  Some((package_name, suggestion))
}
