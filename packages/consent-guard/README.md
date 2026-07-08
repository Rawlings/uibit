# Consent Guard

An asset-level consent wrapper for privacy-invasive third-party scripts and iframes. Instead of a generic cookie banner, ConsentGuard wraps specific heavy assets (YouTube embeds, HubSpot forms, analytics scripts) with a clean placeholder. The actual content only loads after explicit user consent.

## Features

- **Granular Consent**: Consent is managed per-asset, not globally
- **Clean Placeholder UI**: Static placeholder with custom image support
- **localStorage Persistence**: Remembers user choices across sessions
- **Flexible Content**: Supports iframes and external scripts
- **Custom Styling**: Fully themeable with CSS
- **Accessible**: WCAG-compliant keyboard navigation and ARIA labels
- **Zero Dependencies**: Pure Lit web component

## Installation

```bash
pnpm add @uibit/consent-guard
```

## Usage

### Basic iframe example

```html
<uibit-consent-guard
  title="YouTube Video"
  description="This video is hosted on YouTube and requires your consent to load."
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  content-type="iframe"
  height="400"
></uibit-consent-guard>
```

### Script example

```html
<uibit-consent-guard
  title="Analytics"
  description="Enable analytics to help us improve our service."
  src="https://cdn.example.com/analytics.js"
  content-type="script"
></uibit-consent-guard>
```

### With custom placeholder image

```html
<uibit-consent-guard
  title="Embedded Form"
  description="This form requires your consent to display."
  src="https://api.hubspot.com/form"
  content-type="iframe"
  placeholder-image="https://example.com/form-thumbnail.png"
  height="600"
></uibit-consent-guard>
```

## API

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | string | "Third-party Content" | Title displayed in the placeholder (used as fallback for slot) |
| `description` | string | "This content requires your consent to load..." | Description text in the placeholder (used as fallback for slot) |
| `placeholderImage` | string | undefined | Optional custom image URL for the placeholder |
| `src` | string | undefined | Source URL for the iframe or script |
| `contentType` | 'iframe' \| 'script' | 'iframe' | Type of content to load |
| `height` | number \| string | 400 | Height of the iframe or loaded content |
| `autoHeight` | boolean | true | Auto-adjust height based on content |
| `acceptLabel` | string | "Accept Cookies" | Text for the accept button (used as fallback for slot) |
| `declineLabel` | string | "Decline" | Text for the decline button (used as fallback for slot) |

### Slots

| Slot | Description |
|------|-------------|
| `title` | Custom markup for the placeholder title (falls back to `title` property) |
| `description` | Custom markup for the placeholder description (falls back to `description` property) |
| `actions` | Custom markup to replace the action buttons block entirely |
| `accept-label` | Custom markup for the accept button label (falls back to `acceptLabel` property) |
| `decline-label` | Custom markup for the decline button label (falls back to `declineLabel` property) |

### Events

- `consent-accepted`: Fired when the user clicks accept
- `consent-declined`: Fired when the user clicks decline

### Example with events

```html
<uibit-consent-guard
  id="my-guard"
  title="YouTube Video"
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
></uibit-consent-guard>

<script>
  const guard = document.getElementById('my-guard');
  
  guard.addEventListener('consent-accepted', (e) => {
    console.log('User accepted consent for:', e.detail.title);
    // Track analytics, etc.
  });

  guard.addEventListener('consent-declined', (e) => {
    console.log('User declined consent for:', e.detail.title);
  });
</script>
```

## Styling

### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--uibit-consent-guard-primary-color` | #000000 | Primary color used for action buttons and focus indicators |
| `--uibit-consent-guard-primary-hover-bg` | #333333 | Hover background color of primary action button |
| `--uibit-consent-guard-text-color` | #1f2937 | Main text color inside placeholder |
| `--uibit-consent-guard-muted-color` | #6b7280 | Muted text color for description and default icon |
| `--uibit-consent-guard-border-color` | #d1d5db | Border color for placeholder and secondary button |
| `--uibit-consent-guard-bg` | linear-gradient(...) | Background gradient for placeholder |

### CSS Shadow Parts

| Part | Description |
|------|-------------|
| `placeholder` | The main placeholder wrapper card |
| `placeholder-image` | The thumbnail image container |
| `placeholder-content` | The textual content block containing title and description |
| `placeholder-title` | The header title element |
| `placeholder-description` | The paragraph description element |
| `consent-actions` | The actions wrapper containing buttons |
| `accept-button` | The primary acceptance button |
| `decline-button` | The secondary declination button |

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## License

MIT
