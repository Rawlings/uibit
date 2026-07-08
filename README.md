# UIBit – Accessible Web Components Library

A collection of production-ready, accessible web components built with Lit.js. Components are published independently to npm and documented in a centralized Vite + React site.

## Overview

UIBit is a monorepo containing:
- **Component Packages** (`packages/uibit-*/`): Individual web components published to npm
- **Documentation Site** (`packages/docs/`): React + Vite + Tailwind static site deployed to GitHub Pages

## Quick Start

### Prerequisites
- Node.js ≥ 18
- pnpm ≥ 8

### Setup
```bash
git clone https://github.com/yourusername/uibit.git
cd uibit
pnpm install
```

### Development

Start dev servers for all packages:
```bash
pnpm dev
```

Or run specific package:
```bash
pnpm -F @uibit/carousel run dev
pnpm -F @uibit/docs run dev
```

### Building

Build all packages:
```bash
pnpm build
```

Build specific package:
```bash
pnpm build:carousel
pnpm build:docs
```

## Packages

### [@uibit/carousel](./packages/uibit-carousel/README.md)
A native, accessible carousel component using CSS scroll-snap and scroll-driven animations.

**Features:**
- Native CSS scroll-snap (no JavaScript scrolling)
- Scroll-driven animations
- Auto-play with configurable interval
- Touch and keyboard support
- Accessible with ARIA labels
- Responsive

**Install:**
```bash
pnpm add @uibit/carousel
```

## Documentation

See the [docs site](./packages/docs/) for live demos and complete API references.

## Publishing

### Component Packages

Components are published to npm via GitHub Actions when you create a release.

1. Update package versions in `packages/*/package.json`
2. Create a git tag: `git tag @uibit/carousel@1.0.0`
3. Push to GitHub: `git push origin --tags`
4. GitHub Actions will build and publish to npm

Set the `NPM_TOKEN` secret in GitHub repository settings for authentication.

### Documentation

Documentation is automatically deployed to GitHub Pages when changes are pushed to `main`.

## Contributing

Contributions welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT – See [LICENSE](./LICENSE)