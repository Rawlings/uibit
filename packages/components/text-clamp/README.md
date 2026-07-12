# Text Clamp

[Interactive Demonstration](https://rawlings.github.io/uibit/components/text-clamp)

Text Clamp constrains long, multi-line text blocks to a designated maximum line count. When the text exceeds the boundary, the component inserts an inline ellipsis and an interactive toggle (e.g. "More" / "Less") to expand or collapse the content dynamically without page navigation.

## Value Delivery

- **Clean Dashboard Density** – Keeps user interface cards, card feeds, or list view items uniform in size by hiding excessive copy by default.
- **Accurate Recalculation** – Uses a ResizeObserver behind the scenes to recalculate text constraints automatically when viewport widths or container dimensions change.
- **Smooth Layout Integration** – Respects nested HTML templates, allowing styled inline text (bolding, links, lists) to be truncated correctly without breaking markup structure.

## Ideal Applications

- **Review Feeds** – Showing customer ratings or feedback remarks where some responses are extremely long.
- **Blog & Article Previews** – Displaying uniform description snippets in card lists or search results.
- **Biographies & Descriptions** – Managing profiles or catalog details on structured page grids.

## Further Information

Detailed design guidelines, customizable attributes, and integration examples are available on our documentation site.

## Changelog

Please see the [Changelog](CHANGELOG.md) for version history.
