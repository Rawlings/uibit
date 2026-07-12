# Localization

UIBit ships with `en-US` (English, United States) as the default locale. All user-visible strings — aria-labels, UI text, and time unit labels — are wrapped with `@lit/localize` so they can be translated without modifying component source code.

## How it works

Every component imports `msg` and `str` from `@uibit/core`, which re-exports them from `@lit/localize`. Wrapping a string in `msg()` does two things:

- At runtime it returns the translated string for the active locale, falling back to `en-US` if no translation is loaded.
- It marks the string as an extraction target for the `lit-localize extract` CLI, which generates XLB/XLIFF files for translators.

With zero configuration, all components render `en-US` text — no setup required.

## Zero-config default

If you never call `configureUIBitLocalization`, components render their built-in `en-US` strings automatically. No additional packages or configuration needed.

```html
<!-- Works out of the box in en-US -->
<uibit-countdown target="2026-12-31T23:59:59"></uibit-countdown>
<uibit-carousel></uibit-carousel>
<uibit-table></uibit-table>
```

## Adding translations

To support additional locales, call `configureUIBitLocalization` once at app startup, then call `setLocale` to switch. Components re-render automatically when the locale changes.

### 1. Install the peer dependency
```bash
npm install @lit/localize
```

### 2. Configure at app startup
```javascript
import { configureUIBitLocalization, setLocale } from '@uibit/core';

const { setLocale } = configureUIBitLocalization({
  targetLocales: ['fr', 'de', 'ja'],
  loadLocale: (locale) => import(`./locales/uibit.${locale}.js`),
});

// Switch to French — all UIBit components re-render
await setLocale('fr');
```

### 3. Extract strings for translation
Use the `lit-localize` CLI to extract all `msg()` calls from UIBit source into XLIFF files that translators can work with.

```json
// lit-localize.json (in your project root)
{
  "sourceLocale": "en",
  "targetLocales": ["fr", "de", "ja"],
  "tsConfig": "./tsconfig.json",
  "output": {
    "mode": "runtime",
    "outputDir": "./src/locales",
    "localizationModule": "@lit/localize"
  },
  "interchange": {
    "format": "xliff",
    "xliffDir": "./xliff"
  }
}
```

```bash
npx lit-localize extract   # generates xliff/fr.xlf, xliff/de.xlf, …
npx lit-localize build     # compiles to src/locales/fr.js, …
```

## Writing translations manually

For small projects, you can skip the XLIFF toolchain and write locale modules directly. Each module exports a `templates` map keyed by the English source string (or the message id if you set one).

```javascript
// src/locales/uibit.fr.js
import { html } from 'lit';

export const templates = {
  'Days': 'Jours',
  'Hours': 'Heures',
  'Minutes': 'Minutes',
  'Seconds': 'Secondes',
  'Countdown timer': 'Minuterie',
  'Previous slide': 'Diapositive précédente',
  'Next slide': 'Diapositive suivante',
  'Slides': 'Diapositives',
  'Content Carousel': 'Carrousel de contenu',
  'Sentiment rating': 'Évaluation du sentiment',
  'Search table': 'Rechercher dans le tableau',
  'Data table': 'Tableau de données',
  'Export CSV': 'Exporter en CSV',
  'Clear filters': 'Effacer les filtres',
  'Rows:': 'Lignes :',
  'Density:': 'Densité :',
  'Compact': 'Compact',
  'Normal': 'Normal',
  'Comfortable': 'Confortable',
  // ... other strings
};
```

## Strings by component

The following table lists localizable strings currently used across UIBit components:

<!-- strings-table-placeholder -->

## Right-to-left (RTL) support

UIBit components respect the document's text direction. Set `dir="rtl"` on the `<html>` element (or any ancestor) and layout-sensitive components such as the carousel, table, and hotspot will mirror their directional logic automatically via CSS logical properties.

```html
<html lang="ar" dir="rtl">
  ...
  <uibit-carousel></uibit-carousel>
</html>
```

## API reference

### `configureUIBitLocalization(options)`
Configure localization for all UIBit components. Must be called once, before any component renders. Returns `{ setLocale, getLocale }`.

```javascript
import { configureUIBitLocalization } from '@uibit/core';

const { setLocale, getLocale } = configureUIBitLocalization({
  targetLocales: ['fr', 'de'],
  loadLocale: (locale) => import(`./locales/uibit.${locale}.js`),
});
```

### `setLocale(locale: string): Promise<void>`
Switch the active locale. Loads the locale module if not already cached, then triggers a re-render of all UIBit components that contain localizable strings. Requires `configureUIBitLocalization` to have been called first.

```javascript
import { setLocale } from '@uibit/core';

document.querySelector('#lang-switcher').addEventListener('change', (e) => {
  setLocale(e.target.value);
});
```

### `getLocale(): string`
Returns the currently active locale tag (e.g. `"en"`, `"fr"`). Returns `"en"` when localization has not been configured.

### `msg(str: string): string`
Re-exported from `@lit/localize`. Used internally by components. Available from `@uibit/core` if you need to localize strings in your own Lit components alongside UIBit.
