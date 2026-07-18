---
"@uibit/hoistlock": patch
---

Hardened `analyze_file` against pathological import graphs: added a recursion depth cap to prevent a stack overflow on very long non-cyclic import chains, and a regular-file check before reading to prevent hanging on a named pipe or unboundedly reading a device file if resolution lands on one.
