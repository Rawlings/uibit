# AI Agents & Skills for UIBit

This document describes the AI agents and skills configured for the UIBit web components library.

## Overview

UIBit uses AI agents and skills to accelerate development of accessible, production-ready web components built with Lit.js. These skills provide AI-assisted workflows for common component development tasks.

## Agent Workflow and Tool Usage Guidelines

To ensure efficient development and minimize interactive approval prompts:

1. **Avoid Unnecessary Terminal Commands**: Do not run terminal commands for tasks that can be completed using direct API tools.
2. **Prioritize Native File Tools**: Use specific file-manipulation tools (`view_file`, `write_to_file`, `replace_file_content`, `multi_replace_file_content`, `list_dir`, `grep_search`) directly instead of running shell equivalents (e.g. `cat`, `ls`, `grep`, `mkdir`, `touch`).
3. **Minimize Approval Fatigue**: Use commands that require explicit user approval (like shell execution via `run_command`) only when necessary.
4. **Deferred Verification**: Focus primarily on writing and editing code. Defer testing and builds (e.g., running tests, linting, or production builds) to the final stages of the task, rather than executing them after every minor change.
5. **Architectural Leadership**: Act as a Senior Web Architect specialized in web components. Lead and drive tasks proactively, and always conclude every response/task execution with a structured "Next Steps Plan".

## Self-Improving Agentic Harness

To ensure the AI environment stays aligned with architectural goals and developer practices, agents must proactively optimize their own context:

1. **Observe and Codify**: Identify opportunities to capture reusable patterns, architectural constraints, and recurring instructions.
2. **Evolve Skills**: Automatically create new agentic skills or refine existing ones (such as scaffolding templates, testing checklists, and quality audits) to systematically prevent future regressions.
3. **Keep Rules Relevant**: Keep `AGENTS.md` and related config files updated as library architectures and frameworks evolve.

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
agent --skill lit-component-generator --args '{"componentName":"MyButton","category":"forms"}'
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
agent --skill lit-a11y-audit --args '{"componentPath":"components/button"}'
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
agent --skill lit-component-refactor --args '{"componentPath":"components/button"}'
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
agent --skill lit-docs-generator --args '{"componentPath":"components/button"}'
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
agent --skill lit-test-generator --args '{"componentPath":"components/button"}'
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
agent --skill lit-build-optimizer --args '{"packageName":"@uibit/button"}'
```

### 7. **agentic-harness-optimizer**
Audit, optimize, and continuously upgrade agentic guidelines, skills, and templates.

**Capabilities:**
- Scan guidelines for alignment with current code architectures
- Audit existing skills for consistency and completeness
- Scaffold new skills and optimize configuration files
- Refactor templates to align with style rules

**Trigger:** Use when identifying reusable architectural patterns or optimization opportunities in the agentic harness
```bash
agent --skill agentic-harness-optimizer --args '{"action":"audit"}'
```

### 8. **web-architect**
Senior Web Architect persona for leading tasks and planning next steps.

**Capabilities:**
- Proactively lead development tasks and architectural designs
- Enforce Web Component best practices and DESIGN.md constraints
- Always generate structured Next Steps plans upon task completion

**Trigger:** Use to align development mindset, perform design review, or structure roadmap planning
```bash
agent --skill web-architect --args '{"action":"align","componentPath":"packages/components/button"}'
```

### 9. **framework-wrapper-generator**
Audit, refine, and enforce multi-framework wrapper code-generation standards (Angular, React, Vue, Svelte).

**Capabilities:**
- Enforce standard, native primitives for component wrappers (no custom runtime hacks).
- Implement modern, framework-specific reactive bindings (e.g., Signal-based inputs/outputs).
- Ensure proper form integration via native form adapters (like ControlValueAccessor or v-model).

### 10. **lit-copy-reviewer**
Audit and refine UX writing, copywriting, and technical writing for tone, accessibility, and consistency.

**Capabilities:**
- Scan UI templates for user-facing copy, labels, and error messages
- Audit README files, landing pages, and marketing copy for hype/buzzwords
- Audit codebase comments and developer JSDoc annotations for patronizing language
- Align written tone with the three target audiences (End Users, Evaluators, Implementing Engineers)

**Trigger:** Use when reviewing, editing, or writing UI text, documentation, comments, or marketing copy
```bash
agent --skill lit-copy-reviewer --args '{"componentPath":"components/button"}'
```

## How to Use Skills

Skills are available through the agent interface:

1. **Direct Ask**: Simply instruct the agent to run a specific skill (e.g., *"Run lit-a11y-audit on packages/components/button"*).
2. **Context-Aware Triggering**: The agent will automatically detect and apply the instructions from the relevant `SKILL.md` when you ask it to perform tasks of that nature (e.g. generating a component, refactoring, or optimizing builds).

## Project Configuration

Skills and settings are configured in the `.agents/` directory:

- `.agents/settings.local.json` - Permissions and command execution settings
- `.agents/skills/` - Skill implementations

## Best Practices

When using these skills:

1. **Component Generation:** Run `lit-component-generator` before starting new components
2. **Development:** Use `lit-test-generator` for test-driven development
3. **Code Review:** Run `lit-a11y-audit` and `lit-component-refactor` before PR submission
4. **Documentation:** Generate docs with `lit-docs-generator` during development, not as an afterthought
5. **Performance:** Run `lit-build-optimizer` before release builds

## Styling and Theming Guidelines

The full design system is defined in [DESIGN.md](./DESIGN.md). All component styles must conform to it. Key rules:

1. **rem only.** Never use `px` in component styles. All sizes, spacing, radii, and shadow values must be in `rem`. Exception: bare `0` needs no unit.
2. **Grayscale palette.** Use only the color tokens defined in DESIGN.md. No blues, greens, or chromatic colors in defaults. Focus rings are black.
3. **Spacing and radius from scale.** Use values from the spacing and border-radius scales in DESIGN.md. No one-off values.
4. **Standalone components.** Each component defines its own CSS custom property defaults in `:host {}`. No dependency on external or global CSS variables.
5. **Avoid Style Properties**: Do not expose visual layout/styling configuration via public reactive properties (`@property()`). Use CSS variables and Shadow Parts instead.
6. **Prefixed CSS Variables**: All CSS variables exposed by a component must be prefixed with `--uibit-[component-name]-[variable-name]`.
7. **CSS Shadow Parts**: Ensure sub-elements within templates are decorated with `part="..."` attributes to allow external styling using `::part()`.
8. **Minimalist Overlay Controls & Buttons**: All control/navigation buttons and draggable handles (e.g. prev/next overlays, slide indicators, and close/play actions) must be circular, borderless, shadowless, and use a solid `#ffffff` or translucent `rgba(255, 255, 255, 0.75)` background with a `0.5rem` backdrop-filter blur for clarity. Hover states must be highly subtle: shift background to `#f3f4f6` and border-color to `#d1d5db` (never use thick black `#000000` or colored borders). Use soft transition scales (hover `scale(1.05)` or direction shifts, active `scale(0.95)`) for micro-interactions.

## Composability Guidelines

To ensure components are robust and reusable, prioritize HTML slots over data/reactive properties for content:

1. **Avoid Content Properties**: Do not use public properties (e.g. `content`, `label`, `title`) to pass text or markup into elements. Allow consumers to pass nested DOM elements inside standard or named `<slot>` elements.
2. **Backward-Compatible Fallbacks**: When property-based APIs must be maintained for backward compatibility, wrap the property-based rendering inside slot tags (e.g. `<slot name="title">${this.title}</slot>`). This allows slots to gracefully override property defaults if provided.

## Form Associated Component Guidelines

To ensure custom inputs participate in native forms seamlessly with zero custom systems:

1. **Inherit FormAssociatedMixin**: All components acting as form controls (inputs, toggles, selectors) must extend `FormAssociatedMixin` from `@uibit/form-internals`.
2. **Pure Native APIs**: Rely strictly on standard HTML5 form APIs. Do not expose custom non-native attributes, properties, or validation hooks (e.g. no custom hooks like `validationAnchor` or `performCustomValidation`).
3. **Internal Focus Delegation**: Instead of inventing custom focus target configurations, custom elements must override the browser's standard `.focus(options?: FocusOptions)` method to delegate focus internally to their primary interactive sub-element (e.g., input, canvas, button) within the shadow root.
4. **Standard Validation Lifecycle**: Use standard `setCustomValidity()` to perform custom constraints checks, and listen to standard native events (like `invalid`) when reacting to form submission states.

## Writing and Copywriting Guidelines

All user-facing copy, developer comments, JSDoc annotations, and documentation must conform strictly to UIBit's writing standards specified in [WRITING.md](file:///Users/rawlings/uibit/WRITING.md). Key rules:

1. **Tone alignment:** Match target audiences (End Users are reassured; Evaluators get factual, high-signal copy; Implementers get precise technical explanations).
2. **No marketing fluff:** Do not use hype words like "revolutionary", "game-changing", "next-generation".
3. **No patronizing language:** Do not use words like "simply", "just", "obviously", "easy" in technical docs.
4. **Sentence case:** Labels, button text, and error messages use sentence case. Error messages must follow the [Reason] + [Actionable Next Step] pattern.

## Integration with Development

These skills and rules integrate with the standard UIBit development workflow:

- **pnpm workspaces:** Skills respect package boundaries.
- **TypeScript:** Full type support in generated code.
- **Testing:** Generated tests follow Web Component standards.
- **Documentation:** Generated docs follow Markdown conventions.
- **ESLint (v9 Flat Config):** Checks code quality, Lit html templates, and WCAG accessibility standards (`eslint-plugin-lit`, `eslint-plugin-lit-a11y`).
- **Stylelint (v16+):** Enforces styling guidelines directly in CSS template literals (`postcss-lit`), including enforcing `rem`-only units.

## Adding Custom Skills

To add custom skills for your team:

1. Create a new directory in `.agents/skills/<skill-name>/`
2. Add `SKILL.md` with skill documentation
3. Add implementation files (handlers, templates, etc.)
4. Automatically discovered if placed under `.agents/skills/`

See [SKILL.md template](.agents/skills/SKILL-TEMPLATE.md) for structure.

## Troubleshooting

If skills don't appear in the agent interface:

1. Verify `.agents/` directory exists
2. Check `SKILL.md` format and `name:` field
3. Refresh the agent workspace context
4. Check `.agents/settings.local.json` for registration errors

---

**Last Updated:** 2026-07-08  
**For questions:** See CONTRIBUTING.md or open an issue
