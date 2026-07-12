---
name: framework-wrapper-generator
description: Audit, refine, and enforce multi-framework wrapper code-generation standards (Angular, React, Vue, Svelte, etc.)
category: development
tags: [codegen, custom-elements, standards, multi-framework]
author: Senior Web Architect
---

# Multi-Framework Component Wrapper Generation Standards

This skill defines the high-level, framework-agnostic vision and architectural guidelines for generating component wrappers based on the Custom Elements Manifest (CEM). It establishes standard quality bars and patterns to ensure that generated wrappers are publishable, performant, and seamlessly integrated into each target ecosystem (Angular, React, Vue, Svelte, etc.) without introducing custom runtime abstractions.

---

## Core Architectural Vision

When auditing, refactoring, or updating code-generators, follow these five foundational principles:

### 1. Zero Custom Runtime Abstractions
Wrapper generation must produce standard, native code that utilizes the target framework's idiomatic primitives (e.g. Angular Signals/Effects, Vue standard Component Options/h-renders, Svelte Snippets).
* **Rule**: Do not inject custom runtime helper libraries, custom property-sync layers, or dynamic JavaScript `Proxy` objects. Keep all generated files purely standard.

### 2. Isolated Property Synchronization
Web component properties must be updated in response to framework input changes in a strict, isolated manner.
* **Rule**: Each input property must be synchronized independently (via individual setters, reactive effects, or direct bindings).
* **Rationale**: Grouping all property writes into a single joint callback or effect creates crosstalk. Changing a single property would trigger the setters of all other properties, which leads to redundant renderings or lifecycle resets on components that run heavy setup inside property setters.

### 3. Native Form Subsystem Integration
Web components that declare form participation (defined by `formAssociated: true` or utilizing form-associated mixins) must be automatically mapped to the host framework's native form capabilities.
* **Rule**:
  - **Angular**: Generate native `ControlValueAccessor` implementations.
  - **Vue**: Support native `v-model` properties.
  - **React**: Expose standard form control value and handler bindings.
  - **Svelte**: Support native bindings like `bind:value`.
* **Rationale**: Web components cannot participate in standard framework forms unless they implement the appropriate bridging interfaces, which is a major developer experience (Devex) friction point.

### 4. Portable Package Imports & Decoupling
Generators must not assume a local monorepo directory layout or use fragile relative path imports (like `../../index.js`).
* **Rule**: Resolve the entry point/package name dynamically:
  1. Inspect the target package's `package.json` to extract its publishable module name.
  2. Support custom CLI arguments (e.g., `--import-path`) to override the target module path.
  3. Fall back to relative imports only when no publishable package context is present.
* **Rationale**: DEC-compiled wrappers must be publishable, meaning they import from the library package name rather than local development directories.

### 5. Strict Type Safety & Custom Payload Parsing
The generator must produce strongly typed event definitions and property bindings.
* **Rule**:
  - Automatically parse custom event types (e.g., payloads referencing custom types like `MyEventPayload`) from the manifest.
  - Generate the corresponding typed wrappers (e.g. `EventEmitter<CustomEvent<MyEventPayload>>`) and resolve their imports cleanly from the package entry point.
  - Avoid fallback types like `any` or raw `CustomEvent` without generic parameters.

---

## Target-Specific Quality Audits

When generating wrappers for specific frameworks, enforce the following native targets:

### Angular Wrappers (v17+)
- Utilize Signal Inputs (`input()`) and Signal Outputs (`output()`) for native reactivity.
- Leverage native coercion helpers (`booleanAttribute`, `numberAttribute`) for input transformations.
- Declare isolated, independent `effect()` blocks per property inside the constructor to safely sync values.
- Declare output mappings inside `@Component({ host })` bindings to prevent duplicate key conflicts.

### React Wrappers
- Generate wrapper components using `React.forwardRef` to cleanly expose DOM references.
- Sync complex properties (objects, arrays) directly to DOM properties instead of DOM attributes.
- Map custom web component event properties (e.g. `on-slide-change`) to standard camelCase React handlers (e.g. `onSlideChange`).

### Vue Wrappers
- Generate standard functional components using `defineComponent` and `h()` rendering.
- Declare explicit `props` configurations using Vue's options schema and emit events using `emits`.

### Svelte Wrappers
- Generate native `.svelte` files conforming to Svelte 5 `$props()` and `$state()` patterns.
- Declare effects via Svelte's native `$effect()` to sync property values cleanly.
