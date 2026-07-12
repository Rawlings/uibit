# UIBit

UIBit is a collection of framework-agnostic interactive web components built on native standards. Designed with a Scandinavian aesthetic—characterized by clean lines, functional minimalism, generous spacing, and a pure grayscale palette—UIBit provides beautiful, performant, and accessible user interface elements.

---

## The Vision

Modern web development often requires choosing between visual quality, performance, and accessibility. UIBit eliminates these trade-offs by delivering elements that are optimized, compliant, and visually polished by default. 

Rather than recreating styles and behaviors for every framework, UIBit uses native web standards to provide a single, consistent set of components that function everywhere.

---

## Core Pillars

* **Framework Independence** – Built using native Web Components and Lit, UIBit elements integrate into React, Vue, Angular, Svelte, or vanilla HTML applications.
* **Accessibility Compliance** – Designed from the ground up to support keyboard navigation, screen readers, and proper ARIA semantics to meet WCAG standards.
* **Scandinavian Design Philosophy** – Focused on clarity, purpose, and utility. The neutral grayscale design system acts as a clean canvas, adapting to any brand using CSS custom properties.
* **Performance Focus** – Engineered for fast rendering cycles, low layout shift, and minimal bundle sizes to maintain excellent Core Web Vitals.

---

## The UIBit Ecosystem

UIBit is organized as a unified monorepo comprising component libraries and developer tooling:

### 1. Interactive Components
Our visual catalog of web components spans several core categories:
* **Media & Engagement** – Elements like 360-degree product viewers, interactive carousels, and image comparison sliders designed to highlight visual content.
* **Input & Feedback** – Signature fields, sentiment selectors, and privacy guards that respect user consent and streamline form interaction.
* **Display & Timing** – Dynamic typography components, countdown timers, and read-time indicators that guide user attention.
* **Data & Flow** – Responsive tables, A/B testing controllers, and scroll progress tracking elements.

### 2. Platform & Developer Tooling
Underneath the components, UIBit includes native systems to streamline integration and optimization:
* [Framework Codegen](https://rawlings.github.io/uibit/packages/codegen) ([Source](file:///Users/rawlings/uibit/packages/platform/codegen)) – Generates native wrapper packages for React, Vue, Angular, and Svelte.
* [Form Internals](https://rawlings.github.io/uibit/packages/form-internals) ([Source](file:///Users/rawlings/uibit/packages/platform/form-internals)) – Integration layers for native element form participation.
* [Vite WC HMR Plugin](https://rawlings.github.io/uibit/packages/vite-plugin-wc-hmr) ([Source](file:///Users/rawlings/uibit/packages/platform/vite-plugin-wc-hmr)) – Custom Vite plugin for hot reloading custom elements.
* [CEM Extended Analyzer](https://rawlings.github.io/uibit/packages/cem-extended) ([Source](file:///Users/rawlings/uibit/packages/platform/cem-extended)) – Tooling for extracting detailed Custom Elements Manifests.
* [CEM MCP Server](https://rawlings.github.io/uibit/packages/cem-mcp) ([Source](file:///Users/rawlings/uibit/packages/platform/cem-mcp)) – Exposes component specifications directly to AI coding agents.

---

## Explore UIBit

To view live interactive examples, design tokens, and integration details, visit the [UIBit Documentation Site](https://rawlings.github.io/uibit/).

---

## Project Resources

* **[Contributing Guide](CONTRIBUTING.md)** – Learn how to report bugs, suggest features, or submit code.
* **[Code of Conduct](CODE_OF_CONDUCT.md)** – Review our community guidelines.
* **[Changelog](CHANGELOG.md)** – See history and details of releases.
* **[License](LICENSE)** – Released under the MIT License.