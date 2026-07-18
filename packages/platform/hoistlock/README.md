# @uibit/hoistlock

[![NPM Version](https://img.shields.io/npm/v/@uibit/hoistlock.svg?style=flat-square&color=black)](https://www.npmjs.com/package/@uibit/hoistlock)

## Resources

- **[Documentation & Guides](https://rawlings.github.io/uibit/tooling/hoistlock)**
- **[NPM Package](https://www.npmjs.com/package/@uibit/hoistlock)**
- **[GitHub Source Code](https://github.com/rawlings/uibit/tree/main/packages/platform/hoistlock)**

`@uibit/hoistlock` is a zero-build, ultra-fast static import auditing tool in Rust designed to prevent bundle bloating and accidental dynamic hoisting in modern web applications. 

By analyzing the dependency graph of your application at the Abstract Syntax Tree (AST) level, `hoistlock` ensures that third-party packages or first-party components meant exclusively for dynamically loaded routes are never statically pulled (hoisted) into your main application entry bundle.

---

## Value Delivery

*   **Automatic Barrel File Resolution**: Prevents accidental barrel file imports from hoisting dynamic route assets into your main entry bundle.
*   **Zero-Configuration Setup**: Automatically detects and registers your shared global environment packages (like React or lodash) without requiring manual configuration.
*   **Zero-Build, Blazing-Fast Performance**: Built on top of [OXC](https://github.com/oxc-project/oxc)'s parser and resolver with Node.js bindings via [NAPI-RS](https://napi.rs/). Analyzes a complete application graph in **under 10 milliseconds**, making it perfect for commit-time hooks.
*   **Git Pre-Commit Hook Integration**: Runs natively as a Git pre-commit check to block accidental hoisting imports before they ever leave a developer's machine.

---

## Installation

Install hoistlock inside your workspace:

```bash
pnpm add -D @uibit/hoistlock
```

---

## Usage

### 1. Initialize Configuration
Generate a default `hoistlock.json` configuration file in your project root:

```bash
npx @uibit/hoistlock init
```

### 2. Run the Audit
Run the hoisting check:

```bash
npx @uibit/hoistlock check
```

---

## Configuration (`hoistlock.json`)

The default configuration defines the entry point, tsconfig mappings, and path exclusions:

```json
{
  "entry": "./src/main.tsx",
  "tsconfig": "./tsconfig.json",
  "exclude": [
    "**/node_modules/**",
    "**/dist/**",
    "**/*.spec.*",
    "**/*.test.*"
  ]
}
```

### Fields

*   `entry` (Required): The primary entry point file of your main bundle (e.g. `src/main.tsx`).
*   `tsconfig` (Optional): Path to `tsconfig.json` for resolving tsconfig paths and path aliases.
*   `exclude` (Optional): Glob patterns of files to exclude from AST parsing and graph traversal (e.g. `node_modules` to avoid parsing third-party internals, `dist` to ignore built outputs, and `*.test.*` to ignore testing environments).

---

## Git Pre-Commit Hook Setup

To prevent accidental regressions from being committed, set up hoistlock as a Git pre-commit hook:

1. Create a `.githooks` directory and add a `pre-commit` file:
    ```bash
    mkdir .githooks
    touch .githooks/pre-commit
    ```

2. Add the following check inside `.githooks/pre-commit`:
    ```sh
    #!/bin/sh
    npx @uibit/hoistlock check
    ```

3. Bind Git hooks locally:
    ```bash
    git config core.hooksPath .githooks
    chmod +x .githooks/pre-commit
    ```

If a developer imports a package statically into the main bundle that is uniquely used in a dynamic route, the commit will be blocked automatically.
