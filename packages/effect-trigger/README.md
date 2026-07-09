# @uibit/effect-trigger

A behavioral interface engine that intercepts user actions on standard elements (like buttons, form submissions, or card links) to launch customized moments of visual delight. It separates the motion engine from the visual asset, letting developers slot in any HTML, SVG, or icons, and handles spatial cloning, viewport alignment, and physics-driven particle drift.

## Installation

```bash
pnpm add @uibit/effect-trigger
```

## Basic Usage

### Standard Click Trigger

```html
<uibit-effect-trigger trigger="click" behavior="traverse-x-right" velocity="2.5s">
  <button slot="trigger">Ship My Order</button>
  <div slot="asset">
    <svg class="truck-icon" width="24" height="24" fill="currentColor">...</svg>
  </div>
</uibit-effect-trigger>
```

### Fountain Shower Cascade

```html
<uibit-effect-trigger trigger="click" behavior="fountain-burst" density="12" randomize>
  <button slot="trigger">Collect Reward</button>
  <span slot="asset">⭐️</span>
</uibit-effect-trigger>
```

## API Reference

### Attributes & Properties

| Attribute | Type | Default | Description |
|---|---|---|---|
| `trigger` | `'click' \| 'hover' \| 'visible' \| 'custom'` | `'click'` | The event catalyst. Use `'custom'` to trigger manually via JS. |
| `behavior` | `EffectBehaviorType` | `'float-displace'` | The animation movement path (see below). |
| `density` | `number` | `1` | Number of clones generated (primarily for cascades/bursts). |
| `velocity` | `string` | `'1s'` | Time bounds / duration of the effect (e.g. `'600ms'`, `'2.5s'`). |
| `randomize` | `boolean` | `false` | Apply variations in scale, spin, and velocity drift. |

### Pre-Baked Behaviors (`behavior`)

- `traverse-x-right` / `traverse-x-left` — Sweeps assets completely across the viewport horizontally aligning with the target's center axis.
- `traverse-y-up` / `traverse-y-down` — Sweeps assets vertically across the full viewport frame.
- `fountain-burst` — Projects multiple asset copies upward with simulated gravity causing them to arch outward and fall.
- `vortex-attractor` — Spawns assets in container outer borders and spirals them inward to collide at the trigger center.
- `ambient-drift` — Gently floats assets upward from the trigger bottom, swaying left and right.
- `focal-pop` — Centers assets in the screen, zooming them in with a micro-bounce, then fades out.
- `orbit-halo` — Spawns clones orbiting in a circle around the perimeter of the trigger element.
- `float-displace` — Floats assets straight up from the click/cursor coordinate and fades out.

### Custom Behaviors

You can register custom behaviors globally:

```javascript
import { EffectTrigger } from '@uibit/effect-trigger';

EffectTrigger.registerBehavior('my-custom-path', (ctx) => {
  const { triggerEl, assetEl, containerEl } = ctx;
  const clone = assetEl.cloneNode(true);
  clone.style.position = 'fixed';
  clone.style.left = '100px';
  clone.style.top = '100px';
  containerEl.appendChild(clone);
  
  const anim = clone.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(3)' }
  ], { duration: 1000 });
  
  anim.onfinish = () => clone.remove();
});
```

Then use it in HTML:
```html
<uibit-effect-trigger behavior="my-custom-path">
  ...
</uibit-effect-trigger>
```
