# Form

[![NPM Version](https://img.shields.io/npm/v/@uibit/form.svg?style=flat-square&color=black)](https://www.npmjs.com/package/@uibit/form)

## Resources

- **[Documentation & Live Demo](https://rawlings.github.io/uibit/components/form)**
- **[NPM Package](https://www.npmjs.com/package/@uibit/form)**
- **[GitHub Source Code](https://github.com/rawlings/uibit/tree/main/packages/components/form)**

## Installation

```bash
npm install @uibit/form
```

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



## Changelog

Please see the [Changelog](https://github.com/rawlings/uibit/blob/main/packages/components/form/CHANGELOG.md) for version history.
