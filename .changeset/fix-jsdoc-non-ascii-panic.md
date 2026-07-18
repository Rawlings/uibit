---
"@uibit/cem-oxc": patch
---

Fixed a panic when analyzing a JSDoc `@tag {type}` annotation containing any multi-byte UTF-8 character (accented letters, emoji, CJK, etc.) before the closing brace. The brace-matching logic tracked a character index but used it to slice the string by byte offset, causing a "not a char boundary" panic that crashed the whole scan.
