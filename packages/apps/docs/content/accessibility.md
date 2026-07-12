# Accessibility Overview

Accessibility is not an afterthought in UIBit. Every component is designed from the ground up to meet and exceed WCAG 2.1 AA standards.

## Core Principles

### Keyboard Navigation
Every interactive element supports full keyboard navigation. We manage focus delegation intelligently within the Shadow DOM to ensure smooth tab flows.

### ARIA Semantics
Roles, states, and properties are automatically managed. We use native HTML elements wherever possible, falling back to comprehensive ARIA patterns for custom widgets.

### Motion Control
All CSS animations and transitions respect the `prefers-reduced-motion` media query, gracefully degrading to instant state changes.

### Contrast & Color
Our default greyscale palettes are tuned to ensure 4.5:1 contrast ratios for text, and 3:1 for interactive element boundaries.

## Focus Management

We employ `:focus-visible` aggressively to ensure focus rings are only shown when navigating via keyboard, preventing ugly focus states for mouse users while keeping keyboard users oriented.

If you override focus colors, ensure you test them against both your light and dark background surfaces.
