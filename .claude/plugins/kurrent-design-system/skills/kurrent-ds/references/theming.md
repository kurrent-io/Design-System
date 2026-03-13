# Theme System

The `@kurrent-ui/theme` package provides a comprehensive theming system with four built-in themes, CSS custom property injection, and automatic system preference detection.

## Built-in Themes

| Theme | `shade` | `contrast` | Media Match |
|-------|---------|------------|-------------|
| `light` | light | low | default |
| `dark` | dark | low | `prefers-color-scheme: dark` |
| `high_contrast_light` | light | high | `prefers-contrast: more` |
| `high_contrast_dark` | dark | high | Both dark + high contrast |

## Theme API

```typescript
import { theme } from '@kurrent-ui/theme';

// Selection
theme.select('auto');                    // Auto-detect from system
theme.select('dark');                    // Force specific theme
theme.select('high_contrast_light');     // Force high contrast light

// Querying
theme.selected;      // 'auto' | 'light' | 'dark' | 'high_contrast_light' | 'high_contrast_dark'
theme.name;          // Resolved theme name (never 'auto')
theme.shade;         // 'light' | 'dark'
theme.contrast;      // 'high' | 'low'
theme.isDark();      // boolean
theme.isHighContrast(); // boolean

// Color access
theme.colors;        // Full color scheme object (BaseScheme)
theme.colors.background;
theme.colors.highlight;
theme.colors.error;

// Change listener
const unsubscribe = theme.onThemeChange((newTheme) => {
  console.log('Theme changed to:', newTheme.name);
});
// Call unsubscribe() to remove listener
```

## Complete Color Token Reference

All tokens are injected as CSS custom properties on `:root`.

### Core Colors

| Token | Purpose | Contrast Variant |
|-------|---------|-----------------|
| `--color-background` | Page/surface background | `--color-background-contrast` |
| `--color-foreground` | Primary body text | `--color-foreground-contrast` |
| `--color-title` | Heading text | `--color-title-contrast` |
| `--color-highlight` | Brand/accent color | `--color-highlight-contrast` |
| `--color-link` | Clickable link text | `--color-link-contrast` |
| `--color-focus` | Focus ring / outline | `--color-focus-contrast` |

### Status Colors

Each status color has a base, alt, and contrast variant:

| Base Token | Alt Token | Contrast Token | Purpose |
|------------|-----------|----------------|---------|
| `--color-error` | `--color-error-alt` | `--color-error-contrast` | Errors, destructive |
| `--color-warning` | `--color-warning-alt` | `--color-warning-contrast` | Warnings, caution |
| `--color-success` | `--color-success-alt` | `--color-success-contrast` | Success, positive |
| `--color-info` | `--color-info-alt` | `--color-info-contrast` | Informational |

### Shade Scale

Grayscale steps for borders, dividers, and subtle backgrounds:

| Token | Purpose |
|-------|---------|
| `--color-shade-10` | Lightest shade (subtle borders) |
| `--color-shade-20` | Light dividers |
| `--color-shade-30` | Medium borders |
| `--color-shade-40` | Medium-dark elements |
| `--color-shade-50` | Dark elements |
| `--color-shade-60` | Darkest shade (heavy borders) |

### Special Tokens

| Token | Purpose |
|-------|---------|
| `--color-overlay` | Overlay background (opaque) |
| `--color-overlay-alpha` | Overlay background (semi-transparent) |
| `--color-disabled` | Disabled element background |
| `--color-disabled-border` | Disabled element border |
| `--color-disabled-contrast` | Disabled element text |

## Using Theme Colors in CSS

Always use CSS custom properties instead of hardcoded colors:

```css
/* CORRECT */
.my-component {
  background-color: var(--color-background);
  color: var(--color-foreground);
  border: 1px solid var(--color-shade-30);
}

.my-component .title {
  color: var(--color-title);
}

.my-component .error {
  color: var(--color-error);
  background: var(--color-error-alt);
}

.my-component:focus-visible {
  outline: 2px solid var(--color-focus);
}

/* INCORRECT — hardcoded colors break theme switching */
.my-component {
  background-color: #ffffff;
  color: #333333;
  border: 1px solid #e0e0e0;
}
```

## Theme-Aware Component Rendering

In Stencil components, apply theme attributes for CSS-based theme adaptation:

```tsx
import { theme } from '@kurrent-ui/theme';

@Component({ tag: 'my-component', shadow: true, styleUrl: 'my-component.css' })
export class MyComponent {
  render() {
    return (
      <Host high-contrast={theme.isHighContrast()} dark={theme.isDark()}>
        <slot />
      </Host>
    );
  }
}
```

Then in CSS:

```css
:host {
  background: var(--color-background);
  color: var(--color-foreground);
}

:host([dark]) {
  /* Dark-specific overrides if needed */
}

:host([high-contrast]) {
  /* High contrast overrides if needed */
}
```

## Theme Persistence

The theme system automatically persists the user's selection to `localStorage`. On page load:

1. Check `localStorage` for saved preference
2. If `'auto'` or no saved preference, detect from system media queries
3. Apply resolved theme
4. Listen for system preference changes (if `'auto'`)

## Iframe Theme Propagation

For apps with iframes, the theme propagates automatically via a `theme` attribute. Child iframes receive the parent's theme selection.

## Adding a Theme Picker to the UI

Use the layout package's built-in components:

```html
<!-- Dropdown in header -->
<l2-theme-dropdown />

<!-- Or full picker component -->
<l2-theme-picker />
```

These components handle selection, persistence, and visual feedback automatically.

## Responding to Theme Changes

Register a callback to react when the theme changes:

```typescript
import { theme } from '@kurrent-ui/theme';

theme.onThemeChange((currentTheme) => {
  // Update chart colors, canvas rendering, etc.
  updateChartColors(currentTheme.colors);
});
```

## Migration: Replacing Hardcoded Colors

When migrating an existing app to the Kurrent theme system:

1. Search for hardcoded color values (`#`, `rgb(`, `hsl(`, named colors)
2. Map each to the nearest `--color-*` token
3. Replace with `var(--color-token)`
4. Test in all four themes (light, dark, high-contrast light, high-contrast dark)

Common mappings:
| Hardcoded | Replace With |
|-----------|-------------|
| White / `#fff` backgrounds | `var(--color-background)` |
| Black / dark text | `var(--color-foreground)` |
| Bold/heading text | `var(--color-title)` |
| Brand blue/purple | `var(--color-highlight)` |
| Red errors | `var(--color-error)` |
| Green success | `var(--color-success)` |
| Gray borders | `var(--color-shade-20)` to `var(--color-shade-40)` |
| Disabled gray | `var(--color-disabled)` |
