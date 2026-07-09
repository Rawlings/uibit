# Read Timer – Respect Your Reader's Time

Before readers commit to an article, they want to know what they're signing up for. A reading time estimate is a small act of respect that dramatically reduces bounce. Read Timer calculates it automatically from whatever content is slotted — no backend, no metadata field, no word-count plugin.

## Why Read Timer Matters

**Reduces bounce** – Readers self-select based on available time; showing the estimate keeps qualified readers and filters out the rest honestly  
**Signals editorial quality** – Publications that show reading time signal that they value the reader's attention  
**Zero config in CMS templates** – Drop it in once; it measures every article automatically regardless of length  
**Fully inline** – Renders as an `inline-flex` badge that slots naturally into bylines and article headers  

Perfect for: editorial sites, blog platforms, documentation hubs, email newsletters, CMS templates, marketing long-form pages.

## What You Get

- Automatic word counting from slotted HTML — ignores markup, hidden elements, and scripts
- Configurable WPM rate (default 238, reflecting modern reading research)
- Customizable label template with `{time}` placeholder
- Built-in SVG clock icon, togglable
- Fires `read-time-change` with `{ words, minutes }` detail for analytics
- Shadow DOM isolated with full CSS custom property theming

## Implementation

```html
<uibit-read-timer>
  <article>
    <h1>My Article</h1>
    <p>Long form content goes here...</p>
  </article>
</uibit-read-timer>
```

```html
<!-- Custom template and WPM -->
<uibit-read-timer wpm="200" template="{time} to read" show-icon>
  <div class="article-body">...</div>
</uibit-read-timer>
```

## License

MIT
