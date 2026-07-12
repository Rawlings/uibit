# Diff Viewer

[Interactive Demonstration](https://rawlings.github.io/uibit/components/diff-viewer)

Diff Viewer provides a comparison block for reviewing differences between two sets of text or code. It computes a line-level diff internally using the Longest Common Subsequence (LCS) algorithm, displaying additions and removals in a side-by-side (split) or inline format.

## Value Delivery

- **Clear Comparison** – Helps users quickly identify text insertions and deletions with standardized semantic color highlights.
- **Flexible Layouts** – Supports split-pane side-by-side or inline unified layouts to accommodate different screen sizes and user preferences.
- **Self-Contained Computation** – Performs diff calculations entirely client-side without relying on external libraries or server roundtrips.

## Ideal Applications

- **Version History** – Reviewing edits in collaborative documents or content management systems.
- **Code Reviews** – Inline or split presentation of source code edits and patches.
- **Configuration Audits** – Comparing system settings, configuration files, or data payloads.

## Further Information

Detailed design guidelines, customizable attributes, and integration examples are available on our documentation site.

## Changelog

Please see the [Changelog](CHANGELOG.md) for version history.
