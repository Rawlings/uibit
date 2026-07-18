# Text Clamp

[![NPM Version](https://img.shields.io/npm/v/@uibit/text-clamp.svg?style=flat-square&color=black)](https://www.npmjs.com/package/@uibit/text-clamp)

## Resources

- **[Documentation & Live Demo](https://rawlings.github.io/uibit/components/text-clamp)**
- **[NPM Package](https://www.npmjs.com/package/@uibit/text-clamp)**
- **[GitHub Source Code](https://github.com/rawlings/uibit/tree/main/packages/components/text-clamp)**

## Installation

```bash
npm install @uibit/text-clamp
```

Text Clamp constrains long, multi-line text blocks to a designated maximum line count. When the text exceeds the boundary, the component inserts an inline ellipsis and an interactive toggle (e.g. "More" / "Less") to expand or collapse the content dynamically without page navigation.

## Value Delivery

- **Clean Dashboard Density** – Keeps user interface cards, card feeds, or list view items uniform in size by hiding excessive copy by default.
- **Accurate Recalculation** – Uses a ResizeObserver behind the scenes to recalculate text constraints automatically when viewport widths or container dimensions change.
- **Smooth Layout Integration** – Respects nested HTML templates, allowing styled inline text (bolding, links, lists) to be truncated correctly without breaking markup structure.

## Ideal Applications

- **Review Feeds** – Showing customer ratings or feedback remarks where some responses are extremely long.
- **Blog & Article Previews** – Displaying uniform description snippets in card lists or search results.
- **Biographies & Descriptions** – Managing profiles or catalog details on structured page grids.



## Changelog

Please see the [Changelog](CHANGELOG.md) for version history.
