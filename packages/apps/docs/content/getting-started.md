# Installation & Setup

UIBit components are published as independent, framework-agnostic NPM packages. You only install what you need.

## 1. Core Setup

Every component relies on the `@uibit/core` package, which contains the design tokens, accessibility mixins, and foundational CSS.

```bash
npm install @uibit/core
```

Import the base theme in your application's root stylesheet:

```css
@import "@uibit/core/theme.css";
```

## 2. Installing Components

Install the specific component packages you want to use. For example, to use the Carousel:

```bash
npm install @uibit/carousel
```

## 3. Registration

Web components must be registered with the browser. Import the component module once in your application entry point:

```javascript
// In main.js or index.js
import '@uibit/carousel';

// The <uibit-carousel> element is now available everywhere.
```
