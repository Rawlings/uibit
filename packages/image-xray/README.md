# Image Xray – See What Lies Beneath

Every premium product has a story hidden inside it. The carbon fibre weave under the paint. The battery pack beneath the chassis. The acoustic chambers behind the speaker grille. Image Xray lets you tell that story interactively, at exactly the moment and location the user is looking.

## Why Image Xray Matters

**Demonstrates depth** – Two images synchronized pixel-to-pixel; the lens reveals the hidden layer exactly where the cursor sits  
**Commands attention** – Cursor-following interactions are inherently exploratory; users linger longer  
**Replaces static diagrams** – No need for separate cutaway illustrations; context is discovered in place  
**Signals quality** – The reveal interaction itself communicates that there is something worth showing inside  

Perfect for: electric vehicle interiors, consumer electronics cross-sections, architectural material layers, luxury watch movements, industrial machinery, medical device construction.

## What You Get

- Floating circular lens that follows cursor and touch events
- Pixel-perfect alignment between primary and xray images at any lens position
- Smooth opacity transition on cursor enter/leave
- Configurable lens size via CSS custom property or attribute
- Touch support for mobile product pages
- Shadow DOM isolation — drop it into any page without style conflicts

## See It in Action

Visit the interactive demo on the documentation site to see it applied to an electric vehicle exterior/chassis reveal.

## Implementation

Place the primary image in the default slot and the reveal image in the `xray` named slot.

```html
<uibit-image-xray>
  <img slot="" src="car-exterior.jpg" alt="Electric vehicle exterior" />
  <img slot="xray" src="car-chassis.jpg" alt="Battery and motor layout" />
</uibit-image-xray>
```

## License

MIT
