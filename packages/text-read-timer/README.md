# Text Read Timer – Respect Your Reader's Time

Before readers commit to an article, they want to know what they're signing up for. A reading time estimate is a small act of respect that dramatically reduces bounce. Text Read Timer calculates it automatically from whatever content is slotted — no backend, no metadata field, no word-count plugin.

## Why Text Read Timer Matters

**Reduces bounce** – Readers self-select based on available time; showing the estimate keeps qualified readers and filters out the rest honestly  
**Signals editorial quality** – Publications that show reading time signal that they value the reader's attention  
**Zero config in CMS templates** – Drop it in once; it measures every article automatically regardless of length  
**Fully inline or flexible slotting** – Renders as a badge that slots naturally into bylines and article headers, or can be placed in a custom slot anywhere in the component  

Perfect for: editorial sites, blog platforms, documentation hubs, email newsletters, CMS templates, marketing long-form pages.

## What You Get

- Automatic word counting from slotted HTML — ignores markup, hidden elements, and scripts
- Configurable WPM rate (default 238, reflecting modern reading research)
- Customizable label template with `{time}` placeholder
- Built-in SVG clock icon, togglable
- Fires `read-time-change` with `{ words, minutes }` detail for analytics
- Shadow DOM isolated with full CSS custom property theming

## Implementation

### Basic Usage
The text inside the element is fully visible, and the reading time badge displays above it automatically:
```html
<uibit-text-read-timer>
  <article>
    <h1>My Article</h1>
    <p>Long form content goes here...</p>
  </article>
</uibit-text-read-timer>
```

### Custom Slotting
Place the calculated reading time text exactly where you want it inside your layout by targeting `slot="timer"`:
```html
<uibit-text-read-timer>
  <div class="byline">
    <span>By Author Name</span>
    <span>·</span>
    <!-- The component will automatically inject the time label into this slot -->
    <span slot="timer"></span>
  </div>
  <article>
    <p>Long form content goes here...</p>
  </article>
</uibit-text-read-timer>
```

### Custom Template and WPM
```html
<uibit-text-read-timer wpm="200" template="{time} to read" show-icon>
  <div class="article-body">...</div>
</uibit-text-read-timer>
```

## License

MIT
