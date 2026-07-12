# Troubleshooting & FAQ

Solutions for common integration hurdles, especially when working with modern build tools and Server-Side Rendering (SSR) frameworks.

## Server-Side Rendering (Next.js / Nuxt) Errors

Because UIBit components are built on standard Web APIs (like `HTMLElement`), importing them in a Node.js SSR environment will throw `ReferenceError: HTMLElement is not defined`.

### Solution

Import the framework-specific wrapper provided within each package, or use dynamic imports to load the web components only on the client-side.

```javascript
// Next.js example
import dynamic from 'next/dynamic';
const UibitCarousel = dynamic(
  () => import('@uibit/carousel/react').then(mod => mod.Carousel),
  { ssr: false }
);
```
