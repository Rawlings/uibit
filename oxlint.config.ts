import { defineConfig } from "oxlint";
import litPlugin from "eslint-plugin-lit";
import litA11yPlugin from "eslint-plugin-lit-a11y";

export default defineConfig({
  categories: {
    correctness: "error",
  },
  jsPlugins: [
    {
      name: "eslint-plugin-lit",
      plugin: litPlugin,
    },
    {
      name: "eslint-plugin-lit-a11y",
      plugin: litA11yPlugin,
    }
  ],
  rules: {
    // eslint-plugin-lit correctness and best practices
    "lit/no-invalid-html": "error",
    "lit/no-value-attribute": "error",
    "lit/binding-positions": "error",
    "lit/no-property-change-in-update": "error",
    "lit/no-template-arrow": "warn",

    // eslint-plugin-lit-a11y rules for WCAG compliance
    "lit-a11y/alt-text": "error",
    "lit-a11y/aria-attrs": "error",
    "lit-a11y/role-has-required-aria-attrs": "error",
    "lit-a11y/tabindex-no-positive": "error",
    "lit-a11y/click-events-have-key-events": "warn",
    "lit-a11y/mouse-events-have-key-events": "warn"
  }
});
