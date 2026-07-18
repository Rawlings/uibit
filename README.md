# UIBit

[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg?style=flat-square)](LICENSE)

UIBit is a professional, framework-agnostic collection of interactive web components. Built on modern web standards and Lit, these elements provide performant, accessible, and customizable experiences that integrate into any web application or technology stack.

To see UIBit in action, explore the interactive examples, design tokens, and integration guides at [rawlings.github.io/uibit](https://rawlings.github.io/uibit/).

---

## The Vision

Modern web development often requires choosing between visual quality, performance, and accessibility. UIBit eliminates these trade-offs by delivering elements that are optimized, compliant, and visually polished by default. 

Rather than recreating styles and behaviors for every framework, UIBit uses native web standards to provide a single, consistent set of components that function everywhere.

---

## Core Pillars

* **Framework Independence** – Built using native Web Components and Lit, UIBit elements integrate into React, Vue, Angular, Svelte, or vanilla HTML applications.
* **Accessibility Compliance** – Designed from the ground up to support keyboard navigation, screen readers, and proper ARIA semantics to meet WCAG standards.
* **Performance Focus** – Engineered for fast rendering cycles, low layout shift, and minimal bundle sizes to maintain excellent Core Web Vitals.

---

## The UIBit Ecosystem

UIBit is organized as a unified monorepo comprising component libraries and developer tooling:

### 1. Interactive Components
Our visual catalog of web components spans several core categories:
* **Media & Engagement** – Elements like 360-degree product viewers, interactive carousels, image hotspots, scratch reveals, and comparison sliders designed to highlight visual content.
* **Input & Feedback** – Canvas-based signature fields, sentiment selectors, and consent guards that respect user privacy and streamline form interaction.
* **Display & Timing** – Animated text rotators, typewriter effects, countdown timers, and read-time indicators that guide user attention.
* **Data & Flow** – Responsive tables, visual diff-viewers, and scroll progress indicators.

### 2. Platform & Developer Tooling
Underneath the components, UIBit includes native systems to streamline integration and optimization:
* [Core Foundation](https://rawlings.github.io/uibit/packages/core) ([Source](file:///Users/rawlings/uibit/packages/platform/core)) – Base class, performance decorators, and shared utilities for UIBit components.
* [Framework Codegen](https://rawlings.github.io/uibit/packages/frameworks) ([Source](file:///Users/rawlings/uibit/packages/platform/codegen)) – Generates native wrapper packages for React, Vue, Angular, and Svelte.
* [Form Internals](https://rawlings.github.io/uibit/packages/form-internals) ([Source](file:///Users/rawlings/uibit/packages/platform/form-internals)) – Integration layers for native element form participation.
* [Vite WC HMR Plugin](https://rawlings.github.io/uibit/packages/hmr) ([Source](file:///Users/rawlings/uibit/packages/platform/vite-plugin-wc-hmr)) – Custom Vite plugin for hot reloading custom elements.
* [CEM Extended Analyzer](https://rawlings.github.io/uibit/packages/cem-extended) ([Source](file:///Users/rawlings/uibit/packages/platform/cem-extended)) – Tooling for extracting detailed Custom Elements Manifests.
* [CEM OXC Analyzer](https://rawlings.github.io/uibit/packages/cem-oxc) ([Source](file:///Users/rawlings/uibit/packages/platform/cem-oxc)) – Ultra-fast, zero-dependency Custom Elements Manifest (CEM) generator powered by OXC and Rust.
* [CEM MCP Server](https://rawlings.github.io/uibit/packages/cem-mcp) ([Source](file:///Users/rawlings/uibit/packages/platform/cem-mcp)) – Exposes component specifications directly to AI coding agents.
* [Hoistlock](https://rawlings.github.io/uibit/packages/hoistlock) ([Source](file:///Users/rawlings/uibit/packages/platform/hoistlock)) – Zero-configuration, ultra-fast bundle hoisting prevention engine in Rust.


---

## Project Resources

* **[Contributing Guide](CONTRIBUTING.md)** – Learn how to report bugs, suggest features, or submit code.
* **[Code of Conduct](CODE_OF_CONDUCT.md)** – Review our community guidelines.
* **[Changelog](CHANGELOG.md)** – See history and details of releases.
* **[License](LICENSE)** – Released under the MIT License.