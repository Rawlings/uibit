import { defineConfig } from "oxlint";
import litPlugin from "eslint-plugin-lit";
import litA11yPlugin from "eslint-plugin-lit-a11y";

export default defineConfig({
  categories: {
    correctness: "error",
    perf: "error",
    suspicious: "error",
    pedantic: "warn",
    style: "warn",
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
    "lit/no-template-arrow": "error",
    "lit/no-legacy-template-syntax": "error",
    "lit/no-private-properties": "error",
    "lit/no-native-attributes": "error",
    "lit/prefer-static-styles": "error",
    "lit/no-useless-template-literals": "error",
    "lit/quoted-expressions": "error",
    "lit/attribute-value-entities": "error",
    "lit/no-invalid-escape-sequences": "error",
    "lit/no-classfield-shadowing": "error",

    // eslint-plugin-lit-a11y rules for WCAG compliance
    "lit-a11y/alt-text": "error",
    "lit-a11y/aria-attrs": "error",
    "lit-a11y/role-has-required-aria-attrs": "error",
    "lit-a11y/tabindex-no-positive": "error",
    "lit-a11y/click-events-have-key-events": "error",
    "lit-a11y/mouse-events-have-key-events": "error",
    "lit-a11y/anchor-is-valid": "error",
    "lit-a11y/aria-role": "error",
    "lit-a11y/aria-unsupported-elements": "error",
    "lit-a11y/iframe-has-title": "error",
    "lit-a11y/no-autofocus": "error",
    "lit-a11y/no-distracting-elements": "error",
    "lit-a11y/no-redundant-role": "error",
    "lit-a11y/img-redundant-alt": "error",
    "lit-a11y/accessible-emoji": "error",
    "lit-a11y/heading-has-content": "error",
    "lit-a11y/html-has-lang": "error",
    "lit-a11y/lang": "error",
    "lit-a11y/no-access-key": "error",
    "lit-a11y/no-noninteractive-element-to-interactive-role": "error",
    "lit-a11y/no-noninteractive-tabindex": "error",
    "lit-a11y/role-supports-aria-props": "error",
    "lit-a11y/scope": "error"
  }
});
