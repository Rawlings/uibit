---
name: agentic-harness-optimizer
description: Audit, optimize, and continuously upgrade agentic guidelines, skills, and templates
category: meta
tags: [agents, optimization, self-improvement, architecture]
author: Senior Web Architect
---

# Agentic Harness Optimizer

Systematically reviews, refactors, and updates the agentic workspace rules (`AGENTS.md`), custom skills, and configurations to reflect evolving architectural patterns, codebase shifts, and developer workflows.

## What It Does

This skill helps maintain a highly effective and self-improving AI development context by:

- **Auditing Guidelines**: Scanning `AGENTS.md` against recent workspace changes to find outdated assumptions, missing conventions, or styling/architectural drifts.
- **Skill Evolution**: Identifying recurring patterns in development tasks and generating or refining custom agent skills (e.g., updating boilerplate generators, test scripts, or documentation parameters).
- **Harness Verification**: Ensuring that all skills in `.agents/skills/` follow the defined structure and remain functional and well-documented.

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `action` | string | ✓ | The action to perform: `audit` (scan and report gaps) or `apply` (implement specific upgrades) |
| `focusArea` | string | | Target a specific category or component pattern (e.g. `forms`, `a11y`, `styling`) |
| `updateTarget` | string | | Specific skill or section to target for optimization (e.g. `lit-component-generator`, `AGENTS.md`) |

## Usage Examples

### Audit the Harness for Gaps and Architecture Drift
```bash
agent --skill agentic-harness-optimizer --args '{
  "action": "audit"
}'
```

### Apply Styling and Theming Enhancements to Generator Templates
```bash
agent --skill agentic-harness-optimizer --args '{
  "action": "apply",
  "focusArea": "styling",
  "updateTarget": "lit-component-generator"
}'
```

## What It Generates/Produces

- **Audit Reports**: Structured lists of gaps between current codebase practices and agent rules/skills.
- **Updates to AGENTS.md**: Direct additions and refinements to guidelines, ensuring that developer rules stay relevant.
- **New or Updated Skills**: Scaffolding new skills or updating existing custom skill manifests (`SKILL.md`) and helpers (`handler.js`).

## Implementation Details

### Continuous Feedback Loop

The optimization process relies on a three-step cycle:
1. **Analyze**: Identify repetitive developer instructions or manual corrections made during code reviews.
2. **Codify**: Write or refine guidelines in `AGENTS.md` and update code templates/generators to enforce the rules natively.
3. **Automate**: Run verifying scripts to validate that code generators adhere to the updated standard.

## Integration Points

- **Consumes**: Context from codebase changes, lint reports, and developer rules.
- **Updates**: `AGENTS.md`, `.agents/skills/**/*`.
