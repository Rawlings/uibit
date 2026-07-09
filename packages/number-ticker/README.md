# Number Ticker – Statistics That Earn Attention

Numbers tell stories. But a static number on a page is easy to ignore. A number that counts up from zero the moment a user sees it is impossible to dismiss. Number Ticker turns impact metrics, conversion stats, and financial figures into animated moments that land.

## Why Number Ticker Matters

**Creates perceived momentum** – Counting up signals growth; users feel the trajectory, not just the endpoint  
**Rewards scroll** – The animation triggers only when the element enters the viewport, so effort feels earned  
**Handles any format** – Currency symbols, locale separators, decimals, suffixes like "k" or "%" — all native  
**Stays off the main thread** – rAF-based animation loop with easing curves never causes layout thrash  

Perfect for: revenue figures, user counts, performance benchmarks, ESG impact stats, portfolio returns, signup numbers, SLA uptime percentages.

## What You Get

- `IntersectionObserver`-triggered animation — fires once in viewport, or every re-entry with `repeat`
- Three easing curves: `ease-out` (default), `ease-in-out`, `linear`
- Locale-aware formatting via `Intl.NumberFormat`
- Configurable `prefix`, `suffix`, `decimals`, `from`, and `duration`
- Fires `ticker-start` and `ticker-end` events for chaining animations
- Shadow DOM isolated — inherits font styles from the host naturally

## Implementation

```html
<uibit-number-ticker value="12500" prefix="$" locale="en-US" duration="2000"></uibit-number-ticker>

<uibit-number-ticker value="99.9" suffix="%" decimals="1" easing="ease-in-out"></uibit-number-ticker>
```

## License

MIT
