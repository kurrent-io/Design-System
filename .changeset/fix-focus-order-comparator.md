---
'@kurrent-ui/utils': patch
---

Fix operator precedence in the focusable element sort comparator. The previous expression compared elements by the first element's `tabIndex` alone, making the sort order unspecified when elements with differing `tabIndex` values were present.
