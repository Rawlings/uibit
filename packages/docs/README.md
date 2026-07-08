# UIBit Documentation

The official documentation site for UIBit web components, built with React, Vite, and Tailwind CSS.

## Quick Start

### Development

```bash
pnpm install
pnpm dev
```

The site will be available at `http://localhost:5173`

### Building

```bash
pnpm build
```

This generates a static site in the `dist/` directory ready for deployment to GitHub Pages.

### Preview

```bash
pnpm preview
```

## Structure

- `src/main.tsx` – React entry point
- `src/App.tsx` – Root component with navigation
- `src/pages/` – Page components
  - `Home.tsx` – Landing page
  - `CarouselDocs.tsx` – Carousel component documentation
- `src/styles/` – Global styles and Tailwind configuration

## Styling

The site uses Tailwind CSS for styling. Configuration is in `tailwind.config.js` and styles are imported in `src/styles/globals.css`.

## Adding New Pages

1. Create a new component in `src/pages/`
2. Import it in `App.tsx`
3. Add a navigation button in the header

Example:

```tsx
// src/pages/NewComponent.tsx
export function NewComponent() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold">New Component</h1>
      {/* content */}
    </div>
  );
}

export default NewComponent;
```

## Deployment

The documentation is automatically deployed to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions (see `.github/workflows/deploy-docs.yml`).

## License

MIT – See [LICENSE](../../LICENSE)
