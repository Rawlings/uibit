# UIBit Writing Standard

UIBit follows a clean, minimal, functional, and humble aesthetic. Just like our Scandinavian visual design, our writing is spacious, clear, and focused on utility over decoration. 

This document defines the tone of voice, formatting rules, and banned word lists for our three target audiences: **End Users**, **Evaluators**, and **Implementing Engineers**.

---

## 1. End Users (UX Writing / Microcopy)

* **Audience:** Everyday users interacting with our components (e.g., input fields, media players, forms).
* **Objective:** Guide the user effortlessly. Writing should feel invisible, clear, and reassuring.

### Rules & Patterns:
* **Casing:** Use **Sentence case** for all headings, labels, button labels, and helpers (e.g., "Save changes", not "Save Changes" or "SAVE CHANGES"). Title case is only permitted for proper nouns or product names.
* **Brevity:** Keep instruction text under 80 characters.
* **Tone:** Reassuring, helpful, and neutral. Do not accuse the user.
* **Error Messages:** Must always state **[What happened/Why] + [Actionable next step to fix it]**. 

### Banned Words (UX Writing):
* Avoid blame words: *You entered*, *User error*, *Invalid input by you*.
* Avoid technical jargon that the user cannot act on: *Null pointer*, *Error code 500*, *Call stack overflow*.
* Avoid robotic status descriptors when human alternatives exist: *Operation failed* (prefer "Could not save your changes").

### Examples:
* ❌ **Bad:** "Invalid email address entered by user. Error code 400." (Accusatory, robotic, unhelpful)
*  **Good:** "Enter a valid email address, such as name@example.com." (Actionable, clear)
* ❌ **Bad:** "SUBMIT FORM NOW" (All-caps, aggressive)
*  **Good:** "Submit form" (Sentence case, clean)

---

## 2. Evaluators & Decision Makers (Copywriting / Marketing)

* **Audience:** Tech leads, engineering directors, and product managers deciding whether to adopt UIBit.
* **Objective:** Build trust through facts, clarity, performance metrics, and compliance standards.

### Rules & Patterns:
* **No Fluff:** Never use buzzwords, hyped marketing phrases, or unsubstantiated claims.
* **Highlight Hard Data:** Mention actual metrics (bundle size, render latency, standard spec compliance).
* **Format for Scannability:** Use clean bullet points, short paragraphs, and side-by-side feature lists.
* **Focus on Standards:** Frame benefits around native web standards (Web Components, Lit, Shadow DOM, CSS parts).

### Banned Words (Copywriting):
* Avoid marketing hype: *revolutionary*, *next-generation*, *game-changing*, *disruptive*, *world-class*, *groundbreaking*, *state-of-the-art*, *insanely fast*.
* Avoid empty adjectives: *amazing*, *awesome*, *magical*.

### Examples:
* ❌ **Bad:** "UIBit is a revolutionary, game-changing web component library that will disrupt your frontend workflow with state-of-the-art rendering speed." (Heavy hype, zero data)
*  **Good:** "UIBit is a lightweight, zero-dependency Web Component library designed for speed. Built on Lit and native browser APIs, it features a sub-10ms render latency and a sub-15KB bundle footprint." (Factual, high-signal)

---

## 3. Implementing Engineers (Technical Writing / API Docs)

* **Audience:** Developers implementing UIBit components in their applications.
* **Objective:** Provide accurate, complete, and respectful reference documentation and code samples.

### Rules & Patterns:
* **Respect the Developer:** Do not patronize the reader by assuming what is easy or simple.
* **Complete Code Samples:** Avoid pseudo-code or incomplete snippets. Show exact imports and proper markup (with accessibility attributes).
* **JSDoc Discipline:** Every public property, event, custom CSS property (`@cssprop`), and CSS shadow part (`@csspart`) must be documented in code with a clear, concise JSDoc comment.
* **State Side-Effects:** Clearly document performance characteristics, event propagation, and cleanup behaviors (e.g., disconnectedCallback logic).

### Banned Words (Technical Writing):
* Avoid patronizing descriptors: *simply*, *just*, *obviously*, *easy*, *basic*, *of course*, *straightforward*.

### Examples:
* ❌ **Bad:** "You can simply import the button and easily run it in your React app. It obviously works out of the box." (Patronizing, lacks detail)
*  **Good:** "Import `@uibit/button` to register the custom element, then render the `<uibit-button>` tag in your templates." (Direct, objective)
* ❌ **Bad:** `// CSS variable for the theme`
*  **Good:** `@cssprop [--uibit-button-bg=#000000] - Background color of the button element` (Standardized, descriptive)
