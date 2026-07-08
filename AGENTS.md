# AI Agents & Skills for UIBit

This document describes the AI agents and skills configured for the UIBit web components library.

## Overview

UIBit uses Claude Code agents and skills to accelerate development of accessible, production-ready web components built with Lit.js. These skills provide AI-assisted workflows for common component development tasks.

## Available Skills

### 1. **lit-component-generator**
Generate new Lit web components with full scaffolding.

**Capabilities:**
- Create component structure with TypeScript
- Generate Lit template with reactive properties
- Add accessibility attributes (ARIA)
- Include CSS styling with CSS-in-JS or external stylesheets
- Create corresponding test files
- Generate documentation stubs

**Trigger:** Use when starting a new component from scratch
```bash
claude --skill lit-component-generator --args '{"componentName":"MyButton","category":"forms"}'
```

### 2. **lit-a11y-audit**
Audit Lit components for accessibility compliance.

**Capabilities:**
- Check ARIA attributes and semantic HTML
- Verify keyboard navigation support
- Validate color contrast and focus indicators
- Review screen reader compatibility
- Suggest fixes for accessibility violations
- Generate accessibility test cases

**Trigger:** Use when reviewing component accessibility
```bash
claude --skill lit-a11y-audit --args '{"componentPath":"packages/button"}'
```

### 3. **lit-component-refactor**
Refactor and optimize existing Lit components.

**Capabilities:**
- Simplify reactive properties and decorators
- Optimize change detection and re-renders
- Extract reusable logic and shared properties
- Update to latest Lit best practices
- Improve TypeScript typing
- Enhance performance

**Trigger:** Use when improving component quality
```bash
claude --skill lit-component-refactor --args '{"componentPath":"packages/button"}'
```

### 4. **lit-docs-generator**
Auto-generate component documentation.

**Capabilities:**
- Generate README with API documentation
- Create usage examples with code snippets
- Document props, events, and slots
- Generate Storybook stories
- Create accessibility guidelines
- Generate TypeScript prop definitions table

**Trigger:** Use when documenting components
```bash
claude --skill lit-docs-generator --args '{"componentPath":"packages/button"}'
```

### 5. **lit-test-generator**
Generate comprehensive test suites for Lit components.

**Capabilities:**
- Create unit tests with Web Test Runner
- Generate accessibility tests (axe-core)
- Create visual regression test stubs
- Generate interaction tests
- Create prop validation tests
- Mock Lit testing utilities

**Trigger:** Use for test-driven development
```bash
claude --skill lit-test-generator --args '{"componentPath":"packages/button"}'
```

### 6. **lit-build-optimizer**
Optimize build configuration and output.

**Capabilities:**
- Audit Vite configuration
- Optimize bundle size
- Check tree-shaking effectiveness
- Analyze dependencies
- Generate build performance report
- Suggest optimization strategies

**Trigger:** Use for production build preparation
```bash
claude --skill lit-build-optimizer --args '{"packageName":"@uibit/button"}'
```

## How to Use Skills

Skills are available through:

1. **Claude Code CLI:**
   ```bash
   claude skill list
   claude --skill <skill-name>
   ```

2. **Claude Code in VSCode/JetBrains:**
   - Open Command Palette
   - Search "Claude: Run Skill"
   - Select skill and provide args

3. **Claude Code Web (claude.ai/code):**
   - Open Skills panel
   - Browse and run skills directly

## Project Configuration

Skills are configured in `.claude/` directory:

- `.claude/settings.json` - Global skill settings
- `.claude/settings.local.json` - Local overrides
- `.agents/skills/` - Skill implementations

## Best Practices

When using these skills:

1. **Component Generation:** Run `lit-component-generator` before starting new components
2. **Development:** Use `lit-test-generator` for test-driven development
3. **Code Review:** Run `lit-a11y-audit` and `lit-component-refactor` before PR submission
4. **Documentation:** Generate docs with `lit-docs-generator` during development, not as an afterthought
5. **Performance:** Run `lit-build-optimizer` before release builds

## Integration with Development

These skills integrate with the standard UIBit development workflow:

- **pnpm workspaces:** Skills respect package boundaries
- **TypeScript:** Full type support in generated code
- **Testing:** Generated tests follow Web Component standards
- **Documentation:** Generated docs follow Markdown conventions

## Adding Custom Skills

To add custom skills for your team:

1. Create a new directory in `.agents/skills/<skill-name>/`
2. Add `SKILL.md` with skill documentation
3. Add implementation files (handlers, templates, etc.)
4. Register in `.claude/settings.json`

See [SKILL.md template](.agents/skills/SKILL-TEMPLATE.md) for structure.

## Troubleshooting

If skills don't appear in Claude Code:

1. Verify `.agents/` directory exists
2. Check `SKILL.md` format and `name:` field
3. Run `claude --refresh` to reload configuration
4. Check `.claude/settings.json` for registration errors

---

**Last Updated:** 2026-07-08  
**For questions:** See CONTRIBUTING.md or open an issue
