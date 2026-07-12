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

## Capabilities
- **AST Parsing & Extraction**: Scan source directories and parse TypeScript source code into ASTs using `oxc-parser` (or `@swc/core`) to extract type interfaces, enums, classes, and actual property initializers.
- **Custom Elements Manifest (CEM) Analysis**: Read and process properties, attributes, events, slots, and form association metadata from `custom-elements.json`.
- **Wrapper Code Generation**: Auto-generate modern, native-feeling component wrappers (React 19+, Svelte 5+, Vue 3.5+, Angular 19+, and more) directly from element manifests.

---

## Data Source Mapping (CEM vs. AST Parsing)

To construct complete, type-safe wrappers, metadata must be aggregated from both the Custom Elements Manifest (`custom-elements.json`) and direct AST parsing of the TS/JS source files:

| Metadata Field | Primary Source | Fallback / AST Enrichment | Purpose |
| :--- | :--- | :--- | :--- |
| **`tagName`** | **CEM** (`declaration.tagName`) | *None* | Used to generate the component selector / HTML element tag. |
| **`properties` / `attributes`** | **CEM** (`declaration.members`, `declaration.attributes`) | *None* | Identifies the public API inputs, properties, and attributes. |
| **`default` (Property Defaults)** | **CEM** (`m.default`) | **AST** (`resolveSourceDefaults`) | CEM often outputs incomplete stringified values for complex defaults (objects, arrays, functions, expressions). The AST is parsed to extract the exact source code initializer. |
| **`events`** | **CEM** (`declaration.events`) | *None* | Identifies the custom events dispatched by the component. |
| **`payloadKeys`** | **AST** (`extractKeysFromTypeText`) | *None* | Parses the structure of the event type to map parameters for model/two-way binding synchronization (e.g. determining if an event updates a property). |
| **`referencedTypes`** | **AST** (`resolveExportedTypes`) | *None* | Identifies all exported types, interfaces, and enums from the source files so the wrapper can generate clean `import type { ... }` statements. |
| **`formAssociated`** | **CEM** (`declaration.formAssociated`) | **AST** (Detects `FormAssociatedMixin`) | Detects whether the component participates in forms to determine if native form bridges (e.g., `ControlValueAccessor`) should be generated. |

---

## Core Integration Patterns

### 1. Form Subsystem Bridging
For elements that declare form association (`formAssociated: true` or utilizing form-associated mixins):
- **Angular**: Generate native `ControlValueAccessor` implementations mapping Angular form values to the component's `value` property.
- **Vue**: Map `v-model` binding directly to `modelValue` prop and emit `update:modelValue` on `change`/`input` events.
- **React**: Sync `value` and map `onChange`/`onInput` event listeners to standard handlers.
- **Svelte**: Declare stateful properties using `$bindable()` to support native `bind:value` two-way bindings.

### 2. Event Listener Mapping
- Transform custom element kebab-case events (like `slide-change`) to framework-specific targets:
  - React: camelCase handlers (e.g. `onSlideChange`).
  - Angular: Signal-based `output()` emitters.
  - Vue: Vue-native component `emits`.
  - Svelte: Component events and rest props delegation.

### 3. Reactive State Synchronization
- Synchronize complex properties (objects, arrays) directly to DOM properties instead of attributes.
- Set up isolated, property-specific synchronization loops (such as individual `effect()` blocks or Vue `watch` statements) to prevent crosstalk and redundant setups.

---

## Core Architectural Vision

When auditing, refactoring, or updating code-generators, follow these foundational principles:

### 1. Correctness Over Verbosity (AST Builders Preferred)
Correctness of the generated code is the absolute highest priority. While string templates are easy to write, they do not guarantee syntax or type safety.
* **Rule**: As wrapper complexity increases, prioritize programmatic AST builders (using the native `typescript` compiler API or `ts-morph`) over raw string templates. Code verbosity in the generator is acceptable if it guarantees that the output code is syntactically valid and type-safe by construction.
* **Fallback**: If string templates are used, they must be parsed into an AST and validated via compiler checks before being output.

### 2. Completely Generic & Unbiased Design
The codegen engine must be 100% disconnected from any specific component library (e.g. UIBit). It must operate dynamically on arbitrary Custom Elements Manifest metadata.
* **Rule**: Never hardcode component-specific property names, custom types, or event names (e.g., do not hardcode properties like `sentiment` or `rating` to detect two-way bindings). Instead, detect relations programmatically (such as matching a property `name` with a corresponding event `${name}-change` or `${name}Change`).
* **Rule (Zero Hardcoded Events)**: Do not hardcode standard fallback event bindings (such as `'change'`, `'input'`, or `'blur'`) in the wrapper templates. If a custom element dispatches an event, it must be documented in its JSDoc so that it is included in the Custom Elements Manifest (CEM). All event listeners and handlers generated in wrappers must be strictly manifest-driven.

### 3. Zero Custom Runtime Abstractions
Wrapper generation must produce standard, native code that utilizes the target framework's idiomatic primitives (e.g. Angular Signals/Effects, Vue standard Component Options/h-renders, Svelte Snippets).
* **Rule**: Do not inject custom runtime helper libraries, custom property-sync layers, or dynamic JavaScript `Proxy` objects. Keep all generated files purely standard.

### 3. Isolated Property Synchronization
Web component properties must be updated in response to framework input changes in a strict, isolated manner.
* **Rule**: Each input property must be synchronized independently (via individual setters, reactive effects, or direct bindings).
* **Rationale**: Grouping all property writes into a single joint callback or effect creates crosstalk. Changing a single property would trigger the setters of all other properties, which leads to redundant renderings or lifecycle resets on components that run heavy setup inside property setters.

### 4. Native Form Subsystem Integration
Web components that declare form participation (defined by `formAssociated: true` or utilizing form-associated mixins) must be automatically mapped to the host framework's native form capabilities.
* **Rule**:
  - **Angular**: Generate native `ControlValueAccessor` implementations.
  - **Vue**: Support native `v-model` properties.
  - **React**: Expose standard form control value and handler bindings.
  - **Svelte**: Support native bindings like `bind:value`.
* **Rationale**: Web components cannot participate in standard framework forms unless they implement the appropriate bridging interfaces, which is a major developer experience (Devex) friction point.

### 5. Portable Package Imports & Decoupling
Generators must not assume a local monorepo directory layout or use fragile relative path imports (like `../../index.js`).
* **Rule**: Resolve the entry point/package name dynamically:
  1. Inspect the target package's `package.json` to extract its publishable module name.
  2. Support custom CLI arguments (e.g., `--import-path`) to override the target module path.
  3. Fall back to relative imports only when no publishable package context is present.
* **Rationale**: DEC-compiled wrappers must be publishable, meaning they import from the library package name rather than local development directories.

### 6. Strict Type Safety & Custom Payload Parsing
The generator must produce strongly typed event definitions and property bindings.
* **Rule**:
  - Automatically parse custom event types (e.g., payloads referencing custom types like `MyEventPayload`) from the manifest.
  - Generate the corresponding typed wrappers (e.g. `EventEmitter<CustomEvent<MyEventPayload>>`) and resolve their imports cleanly from the package entry point.
  - Avoid fallback types like `any` or raw `CustomEvent` without generic parameters.

---
## Target-Specific Quality Audits (Latest Greenfield Versions)

When generating wrappers, target the latest stable APIs for each supported framework ecosystem:

### 1. React (v19)
- Generate wrapper components that accept the modern React 19 standard `ref` prop directly as a parameter (no need for `forwardRef` wraps).
- Sync complex properties (objects, arrays) directly to DOM properties instead of DOM attributes via `useEffect`.
- Map custom web component event properties (e.g. `on-slide-change`) to standard camelCase React handlers (e.g. `onSlideChange`).
- Filter out custom props and event handlers so they do not bleed into the element tag as HTML attributes.

### 2. Svelte (v5)
- Generate native `.svelte` files conforming to Svelte 5 `$props()` and `$state()` patterns.
- Declare all properties via Svelte 5 `$bindable()` to support two-way bindings.
- Use `$effect()` to sync property values cleanly.
- Listen to custom element events in a generic `$effect()` to propagate state changes back to Svelte's reactive states.
- Support modern rest properties (`...restProps` in `$props()`) and forward them cleanly to the custom element in the template.

### 3. Vue (v3)
- Generate standard functional components using `defineComponent` and `h()` rendering.
- Support native `v-model` binding for form-associated elements by defining `modelValue` prop and emitting `update:modelValue`.
- Declare explicit `props` configurations using Vue's options schema and emit events using `emits`.
- Watch properties reactively using Vue's `watch` and synchronize them directly to DOM properties.

### 4. Angular (v19)
- Utilize Signal-based two-way Model binding (`model()`) for stateful properties (detected generically by looking for corresponding change events, plus standard `value` inputs).
- Utilize Signal Inputs (`input()`) and Signal Outputs (`output()`) for native one-way reactivity and events.
- **Strict Input Overloads**: Only use the dual type-parameter signature `input<T, any>(defaultValue, { transform: ... })` when a coercion utility (like `booleanAttribute` or `numberAttribute`) is provided. For standard inputs, use the single type-parameter signature `input<T>(defaultValue)` to avoid compilation errors under TS overload checks.
- Leverage native coercion helpers (`booleanAttribute`, `numberAttribute`) for input transformations.
- Declare isolated, independent `effect()` blocks per property inside the constructor to safely sync values.
- Declare output mappings inside `@Component({ host })` bindings to prevent duplicate key conflicts and trigger signal `.set()` directly from `$event.target.[prop]`.

### 5. Nuxt (v3)
- Generate SSR-safe client-side loading wrappers that integrate with Nuxt 3's hydration engine.
- Wrap components dynamically or use `<ClientOnly>` wrappers to prevent hydration mismatch errors (e.g. when custom elements are not fully upgraded on the server).
- Ensure generated code exports clean ES modules compatible with Nuxt's auto-import and server-side rendering configurations.

### 6. Astro (v4)
- Generate components that are compatible with Astro's Island architecture and client directives (e.g. `client:load`, `client:visible`).
- Handle static HTML pre-rendering cleanly: output serializable attributes during Astro's build/SSR phase, and dynamically bind custom events only once client hydration completes.

### 7. SolidJS (v1)
- Generate native SolidJS component wrappers that leverage Solid's reactive signal system.
- Utilize Solid's `splitProps` and `mergeProps` utility functions to preserve fine-grained reactivity when passing properties.
- Map custom element attributes and properties cleanly inside Solid's JSX typing namespaces, registering components under Solid's `JSX.IntrinsicElements` and forwarding references using Solid's native `ref` prop binding.

### 8. Qwik (v1)
- Generate Qwik-native component wrappers using Qwik's standard `component$` wrapper.
- Wrap custom element event handlers in Qwik's Optimizer serialization wrappers (`$(...)`) to preserve resumability.
- Map properties and custom events so they can be serialized across the server/client boundary without forcing early hydration of the custom element.

### 9. Preact (v10)
- Generate functional components with Preact hooks (`useRef`, `useEffect`) to synchronize props to properties.
- Extend Preact's JSX namespace definitions (`JSX.IntrinsicElements`) to register the custom tag name, typing all custom properties and events (prefixed with `on` and correctly mapped to custom event interfaces).

### 10. Stencil (v4)
- Generate typing extensions that integrate with Stencil's JSX compilation system and TSX ecosystem.
- Map custom element definitions to Stencil's global namespace, specifically augmenting `HTMLStencilElement` and mapping properties/events inside `LocalJSX` and `JSXBase.HTMLAttributes<T>` namespaces.
- Ensure that public properties (mapping to `@Prop()`) and native DOM elements are typed accurately to allow child-parent type safety during Stencil builds.




