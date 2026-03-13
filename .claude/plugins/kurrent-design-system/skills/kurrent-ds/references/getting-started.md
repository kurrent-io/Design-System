# Getting Started with Kurrent Design System

## Installation

Install the packages needed for the application:

```bash
# Core — almost always needed
npm install @kurrent-ui/theme @kurrent-ui/components

# Forms and fields
npm install @kurrent-ui/fields @kurrent-ui/forms

# Layout shell (sidebar, header, panels)
npm install @kurrent-ui/layout

# Optional
npm install @kurrent-ui/utils @kurrent-ui/router @kurrent-ui/editor @kurrent-ui/stores
```

## Framework Integration

### Stencil / TSX (Native)

Components are built with Stencil and work natively in Stencil projects. Import and use directly:

```tsx
import { Component, h } from '@stencil/core';
import { Page } from '@kurrent-ui/layout';

@Component({ tag: 'my-page', shadow: true })
export class MyPage {
  render() {
    return (
      <Page pageTitle="Settings">
        <c2-button variant="filled">Save</c2-button>
      </Page>
    );
  }
}
```

**Note:** `Page` is a Stencil functional component (not a custom element tag). Other layout components like `l2-header`, `l2-sidebar`, `l2-panel` are regular web components.

### Plain HTML / Vanilla JS

Load the component loaders and use as custom elements:

```html
<script type="module">
  import { defineCustomElements as defineComponents } from '@kurrent-ui/components/loader';
  import { defineCustomElements as defineLayout } from '@kurrent-ui/layout/loader';
  import { defineCustomElements as defineFields } from '@kurrent-ui/fields/loader';
  import { theme } from '@kurrent-ui/theme';

  defineComponents();
  defineLayout();
  defineFields();

  // Initialize theme (auto-detects system preference)
  theme.select('auto');
</script>

<l2-header>
  <l2-theme-dropdown slot="right"></l2-theme-dropdown>
</l2-header>
<l2-sidebar>
  <!-- l2-nav requires a navTree prop, set via JS -->
</l2-sidebar>
<main>
  <c2-button variant="filled">Click me</c2-button>
</main>
```

**Note:** Data-driven components like `l2-nav` and `l2-breadcrumb` require setting props via JavaScript (e.g., `document.querySelector('l2-nav').navTree = [...]`). The `Page` functional component is only available in Stencil TSX.

### React

Web components work in React with some caveats:

```tsx
import { defineCustomElements } from '@kurrent-ui/components/loader';
import { theme } from '@kurrent-ui/theme';

// Call once at app startup
defineCustomElements();
theme.select('auto');

function App() {
  return (
    <main>
      <c2-button variant="filled" onClick={() => alert('clicked')}>
        Save
      </c2-button>
    </main>
  );
}
```

**React caveats with web components:**
- Use `ref` + `addEventListener` for custom events like `fieldchange` (React doesn't natively support custom element events)
- Boolean attributes: pass `true`/`false` explicitly, not truthy/falsy strings
- Complex props (objects/arrays): use `ref` to set them via JavaScript, or JSON-serialize to attributes
- Data-driven components (`l2-nav`, `l2-breadcrumb`): must set props via `ref`

### Angular

Angular supports web components via `CUSTOM_ELEMENTS_SCHEMA`:

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // ...
})
export class AppModule {}
```

```typescript
// main.ts
import { defineCustomElements as defineComponents } from '@kurrent-ui/components/loader';
import { defineCustomElements as defineLayout } from '@kurrent-ui/layout/loader';
import { theme } from '@kurrent-ui/theme';

defineComponents();
defineLayout();
theme.select('auto');
```

### Vue

Vue handles web components natively. Configure the compiler to skip Kurrent tags:

```javascript
// vite.config.js
export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) =>
            tag.startsWith('c2-') || tag.startsWith('f2-') || tag.startsWith('l2-'),
        },
      },
    }),
  ],
};
```

## Theme Initialization

Always initialize the theme early in the application lifecycle:

```typescript
import { theme } from '@kurrent-ui/theme';

// Auto-detect from system preferences
theme.select('auto');

// Or force a specific theme
theme.select('dark');
theme.select('light');
theme.select('high_contrast_dark');
theme.select('high_contrast_light');
```

The theme system:
- Injects CSS custom properties into `:root`
- Persists selection in `localStorage`
- Supports `prefers-color-scheme` and `prefers-contrast` media queries
- Propagates to iframes via the `theme` attribute

## Icon Setup

Register icons before rendering any `c2-icon` components:

```typescript
import { iconStore } from '@kurrent-ui/components';

// Register individual icons
iconStore.addIcons({
  name: 'chevron',
  svg: '<svg>...</svg>',
});

// Or register a namespace of icons
import { K_COMPONENTS_ICON_NAMESPACE } from '@kurrent-ui/components';
// Icons in this namespace are auto-registered
```

Use the `@kurrent-ui/icon-manager` CLI tool for managing project icons:

```bash
npx @kurrent-ui/icon-manager --dir=./src/icons
```

## Key Principles

1. **Use CSS custom properties for all colors** — never hardcode colors; always use `--color-*` tokens
2. **Initialize theme before first render** — call `theme.select()` in the entry point
3. **Register icons early** — before any `c2-icon` renders
4. **Use Shadow DOM parts for customization** — `::part(name)` for styling internals
5. **Compose with slots** — use named slots for content injection
6. **Prefer field-level components** — use `f2-*-field` in forms, `f2-*-input` only for custom layouts
7. **Set data props via JavaScript** — `l2-nav` and `l2-breadcrumb` take data props, not child elements
