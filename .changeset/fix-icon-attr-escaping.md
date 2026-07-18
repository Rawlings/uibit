---
"@uibit/core": patch
---

Fixed `iconNodeToSvg` producing broken markup whenever an icon attribute value contained a `"` character, by escaping attribute values before interpolating them into the generated SVG string.
