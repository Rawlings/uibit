# Sentiment Bar – Feedback That Feels Good to Give

Most feedback widgets feel like a chore. A row of greyed-out stars, a submit button, a confirmation toast. Sentiment Bar turns that into a micro-moment: tap an emoji, watch it spring up and come alive while the others fade back, see the label shift. The interaction itself communicates that you were heard before the data even leaves the page.

## Why Sentiment Bar Matters

**Higher response rates** – Expressive, tactile interactions lower the psychological cost of giving feedback  
**Instant signal** – No submit button; the score fires on selection for real-time dashboards  
**Confirms engagement** – A second tap on the same option fires `sentiment-submit` for explicit confirmation  
**Fully customizable** – Replace the default emoji set with stars, numbers, or any Unicode character set  

Perfect for: post-purchase NPS, article quality ratings, support ticket resolution scores, onboarding satisfaction checks, feature feedback modals, session exit surveys.

## What You Get

- Five default emoji options (😣 → 😍) with spring-curve scale animation on selection
- Grayscale dimming on unselected items to draw focus to the active choice
- Hover label preview before committing
- `sentiment-change` fires on every selection; `sentiment-submit` fires on re-tap (confirmation)
- Fully replaceable `options` array — any `{ value, emoji, label }` set works
- `value` attribute reflected for CSS state styling (`[value="5"]`)

## Implementation

```html
<uibit-sentiment-bar></uibit-sentiment-bar>

<!-- Custom options -->
<uibit-sentiment-bar
  options='[{"value":1,"emoji":"⭐","label":"Poor"},{"value":2,"emoji":"⭐⭐","label":"Fair"},{"value":3,"emoji":"⭐⭐⭐","label":"Good"},{"value":4,"emoji":"⭐⭐⭐⭐","label":"Great"},{"value":5,"emoji":"⭐⭐⭐⭐⭐","label":"Excellent"}]'
></uibit-sentiment-bar>
```

```js
document.querySelector('uibit-sentiment-bar').addEventListener('sentiment-change', e => {
  console.log(e.detail); // { value: 4, label: 'Good' }
});
```

## License

MIT
