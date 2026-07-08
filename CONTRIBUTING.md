# Contributing to UIBit

Thank you for your interest in contributing to UIBit! This guide will help you get started.

## Getting Started

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/yourusername/uibit.git
   cd uibit
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development

### Working on Components

To develop a component in the `packages/uibit-carousel/` package:

```bash
cd packages/uibit-carousel
pnpm dev
```

### Working on Documentation

To develop the documentation site:

```bash
cd packages/docs
pnpm dev
```

### Building

Build all packages:
```bash
pnpm build
```

Build a specific package:
```bash
pnpm build:carousel
pnpm build:docs
```

## Creating New Components

1. **Create a new package directory**
   ```bash
   mkdir -p packages/uibit-<component-name>
   ```

2. **Copy the carousel package structure** as a template

3. **Update package metadata**
   - Edit `package.json` with the new component name and description
   - Update the repository directory field

4. **Implement your component**
   - Create the main Lit component in `src/<component-name>.ts`
   - Add styles in `src/<component-name>.css`
   - Export types and the component in `src/index.ts`

5. **Create documentation**
   - Add installation and usage examples in `README.md`
   - Create a documentation page in `packages/docs/src/pages/<Component>Docs.tsx`

## Code Style

- **TypeScript**: Use strict mode, explicit types
- **Formatting**: Use prettier (configured in `.editorconfig`)
- **Components**: Follow Lit.js patterns and conventions
- **CSS**: Use CSS custom properties for theming where possible

## Testing

Comprehensive unit tests are coming! For now, manual testing is required:

1. Build the component: `pnpm build`
2. Test in the documentation site
3. Test in a standalone HTML file

## Commit Messages

Use clear, descriptive commit messages:

```
feat: add new carousel feature
fix: resolve carousel navigation bug
docs: update carousel documentation
refactor: simplify carousel logic
```

## Pull Requests

1. **Push your changes** to your fork
2. **Create a Pull Request** with a clear description
3. **Link any related issues**
4. **Wait for review** – at least one review required
5. **Merge** – PRs are merged with squash commits to keep history clean

## Publishing

### Publishing Components to npm

1. Update the version in `packages/uibit-<component>/package.json`
2. Commit and push to main
3. Create a git tag: `git tag @uibit/<component>@<version>`
4. Push the tag: `git push origin --tags`
5. GitHub Actions will automatically build and publish to npm

Requires `NPM_TOKEN` secret in GitHub repository settings.

### Publishing Documentation

Documentation is automatically deployed to GitHub Pages when changes are pushed to `main`.

## Code of Conduct

Please be respectful and inclusive in all interactions. Treat all contributors with kindness.

## Questions?

- **Issues**: File an issue with a clear description
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact the maintainers directly

## License

By contributing to UIBit, you agree that your contributions will be licensed under its MIT License.

---

Thank you for making UIBit better! 🎉
