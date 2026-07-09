# Typing Text – Headlines That Write Themselves

Static headlines compete with everything else on the page. A headline that types itself in real time commands the eye. Typing Text cycles through your best marketing phrases with the kind of subtle imperfection — slight speed variance, the occasional auto-corrected typo — that makes it feel genuinely human rather than mechanical.

## Why Typing Text Matters

**Packs more message into less space** – Cycle through five value propositions where one used to live  
**Human imperfection builds trust** – Simulated typos and speed variance signal organic motion, not a CSS loop  
**Keeps above-the-fold fresh** – Returning visitors see a different phrase each cycle without a page reload  
**Zero layout shift** – The cursor and text live inline; reserve height with your container, not the component  

Perfect for: hero sections, product taglines, landing page headlines, SaaS value propositions, portfolio headers, waitlist pages.

## What You Get

- Realistic typing and deletion loop with configurable per-character speed
- Speed jitter (±40% per keystroke) for organic feel
- Configurable typo rate — wrong character inserted then immediately corrected
- Blinking cursor node with CSS-controlled blink interval and style
- `phrase-change` event for syncing other elements to the active phrase
- `loop` flag to stop after the last phrase for one-shot animations

## Implementation

```html
<h1>
  We help teams
  <uibit-typing-text phrases='["ship faster", "build better", "scale confidently"]'></uibit-typing-text>
</h1>
```

```js
// Or set phrases programmatically
const el = document.querySelector('uibit-typing-text');
el.phrases = ['Ship faster', 'Build better', 'Scale confidently'];
el.typeSpeed = 70;
el.typoRate = 0.06;
```

## License

MIT
