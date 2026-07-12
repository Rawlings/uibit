---
name: lit-copy-reviewer
description: Audit and refine UX writing, copywriting, and technical writing for tone, accessibility, and consistency.
category: quality
tags: [writing, copy, tone, documentation, jsdoc, readme]
author: UIBit Team
---

# Lit Copy Reviewer

Audits and standardizes UI copy, marketing copy, code comments, and documentation to align with UIBit's Scandinavian tone and voice guidelines.

## What It Does

This skill instructs the agent on how to:
1. **Analyze UX Writing / UI Text:** Verify that all buttons, labels, and error messages use sentence case and follow the [Reason] + [Actionable Next Step] pattern.
2. **Audit Copywriting / Marketing Text:** Scan README files and landing pages for buzzwords, fluff, and empty adjectives, replacing them with concrete data, standards compliance, and performance metrics.
3. **Audit Technical Writing / API Docs:** Review comments, JSDocs, and instructions to ensure they are clear, precise, complete, and free of patronizing descriptors.

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `componentPath` | string | ✓ | Path to the component or package folder to review |
| `focusArea` | string | | Specify `ux`, `copy`, or `tech` to restrict the audit scope |

## Usage Examples

### Example 1: Full Copy Audit of a Component
```bash
agent --skill lit-copy-reviewer --args '{
  "componentPath": "packages/components/button"
}'
```

### Example 2: Focus Audit on Technical Docs & JSDocs
```bash
agent --skill lit-copy-reviewer --args '{
  "componentPath": "packages/components/video-player",
  "focusArea": "tech"
}'
```

## Tone & Writing Auditing Guidelines

When this skill is triggered, read the standard defined in [WRITING.md](file:///Users/rawlings/uibit/WRITING.md) and systematically execute the following checklist:

### 1. UX Copy Checklist
- **Sentence Case Check:** Ensure all button labels, error alerts, and field labels are in sentence case (e.g., "Enter password", not "Enter Password").
- **Error Formatting:** Verify all error strings explicitly state what went wrong followed by how the user can fix it (e.g., "Could not load video. Check your network connection and retry").
- **Clarity & Brevity:** Ensure helper text and error notifications are under 80 characters.
- **Accusation Check:** Remove blame-shifting phrases (e.g., "You forgot to enter", "User entered bad input").

### 2. Marketing / Copywriting Checklist
- **Buzzword Elimination:** Flag and remove empty adjectives/hype terms: *revolutionary*, *next-gen*, *game-changing*, *disruptive*, *world-class*, *groundbreaking*, *state-of-the-art*, *insanely fast*.
- **High-Signal Facts:** Translate hype into specifications (e.g., instead of "super lightweight", specify "sub-10KB bundle footprint").
- **Scannability:** Format content with bulleted feature lists, spacing, and short headers.

### 3. Technical Writing & API Checklist
- **Patronizing Language Check:** Flag and delete patronizing words: *simply*, *just*, *obviously*, *easy*, *basic*, *of course*, *straightforward*.
- **Documentation Completeness:** Check that all `@cssprop`, `@csspart`, methods, properties, and slots are fully documented with JSDoc comments.
- **Runnable Examples:** Verify code snippets in the README are syntactically valid and contain all imports.

## Verification

To verify that the skill was executed correctly:
- ✓ Verify that the reviewed file contains zero banned words.
- ✓ Check that all modified templates/markdown compile and build successfully.
- ✓ Ensure all UI labels are in sentence case.
