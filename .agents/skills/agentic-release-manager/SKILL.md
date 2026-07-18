---
name: agentic-release-manager
description: Audit pending changes and generate changeset files autonomously
category: release
tags: [release, changesets, git, semver, lifecycle]
author: Antigravity
---

# Agentic Release Manager

Use this skill to autonomously detect pending changes in the monorepo, determine their SemVer impact (major, minor, patch), and generate properly formatted `.changeset/*.md` files. This ensures high-velocity publishing with zero interactive prompt friction.

## What It Does

This skill eliminates interactive prompts during release prep by letting the agent:
1. Scan local modifications or git commits relative to the base branch (`main` or latest tag).
2. Group changes by package.
3. Automatically determine the appropriate SemVer type (patch, minor, major).
4. Draft changelog descriptions matching the tone, clarity, and rules in `WRITING.md`.
5. Write the changeset markdown file directly to `.changeset/<custom-slug>.md`.

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| action | string | ✓ | `detect` (only analyze and print summary) or `generate` (write changeset files) |
| targetBranch | string | | The base branch to compare changes against. Default is `main`. |
| forceBump | object | | Manually override package bump levels (e.g., `{"@uibit/button": "minor"}`). |

## Usage Examples

### Example 1: Detect and summarize changes
Instruct the agent using natural language:
> "Analyze the workspace changes and summarize which packages have pending updates."

### Example 2: Generate changeset files
Instruct the agent using natural language:
> "Run the agentic-release-manager skill to generate the required changeset files for our recent changes."

## What It Generates/Produces

- **Changeset markdown file**: `.changeset/<unique-slug>.md`.
  ```markdown
  ---
  "@uibit/button": patch
  ---

  Refactored focus states in @uibit/button to delegate focus internally to the inner button, ensuring standard keyboard navigation works.
  ```

## Implementation Guidelines for Agents

### 1. Identify Modified Packages
Analyze the diff using `git diff --name-only` or by scanning recent commits. Map each changed file path to its workspace package.
For example:
- `packages/components/button/...` maps to `@uibit/button`.
- `packages/platform/vite-plugin-wc-hmr/...` maps to `@uibit/vite-plugin-wc-hmr`.

### 2. Classify SemVer Bumps
Follow strict semantic versioning rules:
- **patch**: Backward-compatible bug fixes, internal code refactoring, performance improvements, or documentation changes.
- **minor**: New backward-compatible features, adding new properties/slots/events, or adding new components.
- **major**: Breaking changes, changing component names, deleting public properties/methods/events, or updating required peer dependencies.

### 3. When NOT to Write a Changeset
Do NOT generate a changeset for purely internal tasks that have zero impact on consumers or downstream package execution:
- **Build configurations/scripts**: Standardizing dev, build, compile, or test tasks.
- **CI/CD workflows**: Adjusting GitHub Action definitions or release configurations.
- **Internal lint/style rules**: Adding or removing rules for linters, formatters, or configurations (e.g. Biome).
- **Internal-only refactoring**: Code cleanup or documentation structure updates that do not alter the public API or behavior of any packages.

If the changes fall under this category, simply commit them directly to Git without creating a changeset.

### 4. Apply Writing Guidelines (WRITING.md)
All changeset descriptions must:
- Use **sentence case** for descriptions.
- Align with the target audiences:
  - **End Users**: Use reassuring, outcome-oriented language.
  - **Evaluators**: Keep descriptions factual and high-signal.
  - **Implementing Engineers**: Be precise, providing specific technical details.
- Avoid hype/buzzwords ("revolutionary", "game-changing").
- Avoid patronizing language ("simply", "just", "easy").
- Format error-related descriptions as: `[Reason] + [Actionable Next Step]`.

### 5. Standardized Formatting & Brevity Rules
To ensure all changesets are short, informative, and uniform, you must strictly follow these rules:
- **Brevity Constraint**: Keep the description to exactly 1 or 2 sentences. Target under 150 characters. Never write multi-paragraph or overly verbose explanations.
- **Action-Oriented Past Tense**: Begin the description with a past-tense action verb (e.g., `Added`, `Fixed`, `Refactored`, `Updated`, `Removed`, `Optimized`).
- **Sentence Patterns**:
  - **New Features (minor)**: `Added [feature] to [package/component] to [benefit/use case].`
  - **Bug Fixes (patch)**: `Fixed [issue/bug] in [package/component] where [condition/trigger] caused [erroneous behavior].`
  - **Optimizations/Refactors (patch)**: `Optimized/Refactored [feature/internal] in [package/component] to improve [performance/accessibility/DX].`
  - **Breaking Changes (major)**: `Removed/Renamed [deprecated API/feature] in [package/component]. Consumers must [migration action].`

### 6. Create Random Slug
Use a standard random string generator (e.g., two hyphenated words like `cool-breeze.md`) or simple descriptive slugs.

## Verification

- ✓ Verify that the frontmatter lists all changed packages with their bump types.
- ✓ Verify the description is exactly 1-2 sentences and under 150 characters where possible.
- ✓ Verify the description starts with a past-tense action verb (e.g., `Added`, `Fixed`, `Refactored`).
- ✓ Verify the description reads clearly and follows writing standards.
- ✓ Run `npx --package=@changesets/cli changeset status` or `pnpm build` to verify configuration integrity.
