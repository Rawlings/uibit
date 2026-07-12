# @uibit/form

A composable, declarative wrapper around native HTML `<form>` elements that adds wizards, submit lifecycle states, and dirty checking.

## Features

- **Progressive Enhancement:** Works as a standard form wrapper, falling back to native browser submission if JS is disabled or not yet loaded.
- **Fetch Submission Lifecycle:** Intercepts submission when the slotted form has `action` set, executing a fetch request and exposing `status` states (`idle`, `pending`, `success`, `error`) for custom styles.
- **Multi-step Wizard:** Turns nested `<fieldset>` tags inside the slotted form into steps automatically. Includes step validation and built-in transition controls.
- **Dirty State Tracking:** Compares initial values against current input states, exposing a `dirty` attribute and optional navigation prompt via `warn-unsaved`.

## Installation

```bash
pnpm add @uibit/form
# or
npm install @uibit/form
```

## Usage

### Simple Form with Fetch Submission

Slot a native `<form>` directly inside `<uibit-form>`.

```html
<uibit-form>
  <form action="/api/submit" method="POST">
    <div>
      <label for="name">Name</label>
      <input id="name" name="name" type="text" required />
    </div>

    <div>
      <label for="email">Email</label>
      <input id="email" name="email" type="email" required />
    </div>

    <button type="submit">Submit</button>
  </form>

  <!-- Custom submission message slots -->
  <div slot="loading">
    <p>Submitting form...</p>
  </div>
  <div slot="success">
    <h3>Submitted successfully!</h3>
  </div>
</uibit-form>
```

### Multi-step Wizard

Group inputs inside `<fieldset>` tags inside the nested `<form>`. `<uibit-form>` will detect them and act as a wizard.

```html
<uibit-form>
  <form action="/api/wizard" method="POST">
    <fieldset>
      <legend>Step 1: Contact Info</legend>
      <label>First Name <input name="firstName" required /></label>
      <label>Last Name <input name="lastName" required /></label>
    </fieldset>

    <fieldset>
      <legend>Step 2: Preferences</legend>
      <label>Newsletter <input type="checkbox" name="newsletter" /></label>
    </fieldset>
  </form>
</uibit-form>
```

## API Reference

### Properties / Attributes

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `warnUnsaved` | `warn-unsaved` | `boolean` | `false` | Prompts user before leaving page if the form is dirty. |
| `step` | `step` | `number` | `1` | The currently active step (1-indexed) in wizard mode. |
| `dirty` | `dirty` | `boolean` | `false` | (Reflected/Read-only) Whether the form values have changed. |
| `status` | `status` | `string` | `'idle'` | (Reflected/Read-only) Current status: `'idle'`, `'pending'`, `'success'`, or `'error'`. |

### Custom Events

- `uibit-step-change`: Dispatched when the step changes in wizard mode. `detail: { step: number }`
- `uibit-reset`: Dispatched when the form is reset.
- `uibit-submit-success`: Dispatched when fetch submission succeeds. `detail: { response: Response }`
- `uibit-submit-error`: Dispatched when fetch submission fails. `detail: { error: Error }`
