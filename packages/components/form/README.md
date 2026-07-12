# Form

[Interactive Demonstration](https://rawlings.github.io/uibit/components/form)

Form provides a composable, declarative wrapper around standard HTML `<form>` elements. It adds multi-step wizard navigation, asynchronous submission lifecycle states, and unsaved changes tracking to simplify form construction.

## Value Delivery

- **Progressive Enhancement** – Operates as a wrapper around native forms, falling back to default browser submission behavior if JavaScript has not loaded.
- **Asynchronous Lifecycles** – Intercepts submissions to perform fetch requests, exposing state attributes (idle, pending, success, error) to allow custom interface feedback.
- **Automated Multi-step Wizards** – Groups inputs within standard `<fieldset>` tags into structured wizard steps with navigation buttons and step validation.
- **Safe Navigation** – Tracks changes across all internal fields, warning users before they navigate away with unsaved details.

## Ideal Applications

- **Onboarding flows** – Multi-step registration forms or surveys.
- **Data editing screens** – Safe updates of profile records, settings panels, or metadata grids.
- **Transactional submittals** – Fast user checkouts or feedback collection points.

## Further Information

Detailed design guidelines, customizable attributes, and integration examples are available on our documentation site.

## Changelog

Please see the [Changelog](CHANGELOG.md) for version history.
