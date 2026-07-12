# Icons

UIBit ships a small set of built-in icons from [Lucide](https://lucide.dev) used internally by components. You can override any of these or add new ones using `registerIcons` from `@uibit/core`.

## Built-in Icons

Click any icon name to copy it to your clipboard.

<!-- icons-grid-placeholder -->

## Custom Icons

Call `registerIcons` once at application startup to override built-in icons or add your own. Each value is either a raw SVG string or a function that receives a `size` number and returns an SVG string.

### Static SVG string
```javascript
import { registerIcons } from '@uibit/core';

registerIcons({
  'chevron-left': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>',
});
```

### Size-aware function
Use a function when the icon should scale to match the component's requested size.

```javascript
import { registerIcons } from '@uibit/core';

registerIcons({
  'x': (size) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>`,
});
```

### Using with Lucide
If your project already uses Lucide, you can easily register additional icons from it using the built-in `fromLucide` helper.

```javascript
import { registerIcons, fromLucide } from '@uibit/core';
import { Star, Heart } from 'lucide';

registerIcons({
  'star': fromLucide(Star),
  'heart': fromLucide(Heart),
});
```

### Using with FontAwesome
To register FontAwesome icons, you can extract the SVG path data from FontAwesome's SVG package (e.g. `@fortawesome/free-solid-svg-icons`) and return an SVG string.

```javascript
import { registerIcons } from '@uibit/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

registerIcons({
  'star': (size) => {
    const [width, height, , , pathData] = faStar.icon;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${size}" height="${size}" fill="currentColor">
      <path d="${pathData}" />
    </svg>`;
  }
});
```

Alternatively, if you load the FontAwesome webfont stylesheet, you can register a function that returns an icon element with FontAwesome classes:

```javascript
import { registerIcons } from '@uibit/core';

registerIcons({
  'star': (size) => `<i class="fa-solid fa-star" style="font-size: ${size}px; line-height: 1;"></i>`,
});
```

## API Reference

| Export | Signature | Description |
| :--- | :--- | :--- |
| `registerIcons` | `(icons: Record<string, IconDefinition>) => void` | Registers one or more icons by name. Call once before components mount. Overrides existing entries. |
| `getIcon` | `(name: string, size?: number) => TemplateResult \| string` | Returns a Lit `unsafeHTML` template result for use in Lit components. Falls back to built-in Lucide set, then an empty string. |
| `IconDefinition` | `string \| ((size: number) => string)` | An icon is either a static SVG string or a size-aware factory function. |
