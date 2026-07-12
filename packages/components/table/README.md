# Table

[Interactive Demonstration](https://rawlings.github.io/uibit/components/table)

Table wraps standard HTML `<table>` elements and layers on a full data grid feature set including searching, pagination, sorting, row selection, column resizing, filtering, and CSV export. The source markup is parsed once on slot assignment and never mutated, rendering the enhanced interface entirely inside the shadow DOM.

## Value Delivery

- **Progressive Enhancement** – Consumers write standard HTML tables for clean SEO and semantic fallback, which are then upgraded with rich features in the browser.
- **Enhanced Data Density** – Includes column visibility selectors, striped rows, and sticky headers to keep layouts readable even with large datasets.
- **Client-Side Operations** – Features built-in logic for multi-column sorting, text queries, and pagination with zero external setup required.

## Ideal Applications

- **Dashboards & Reporting** – Displaying lists of users, logs, transactions, or system parameters.
- **Data Inventories** – Product directories or catalog management tools where filtering and export are essential.
- **Settings & Auditing** – Listing configurations, event trails, or batch properties.

## Further Information

Detailed design guidelines, customizable attributes, and integration examples are available on our documentation site.

## Changelog

Please see the [Changelog](CHANGELOG.md) for version history.
