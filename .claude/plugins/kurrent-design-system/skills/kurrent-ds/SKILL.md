---
name: kurrent-ds
description: This skill should be used when the user asks to "build a UI", "create a page", "add a form", "use Kurrent components", "align to Kurrent Design System", "migrate to Kurrent", "set up theming", "add a sidebar", "create a layout", "use design system components", "add icons", "replace hardcoded colors", or mentions Kurrent UI, @kurrent-ui packages, c2-/f2-/l2- components, or building web/desktop applications that should follow the Kurrent design language.
---

# Kurrent Design System

Guidance for building and aligning web and desktop applications to the Kurrent Design System — a component library built on Stencil web components with comprehensive theming, form validation, layout primitives, and icon management.

## Package Overview

| Package | Scope | Purpose |
|---------|-------|---------|
| `@kurrent-ui/components` | Core UI | Buttons, tables, modals, tabs, toasts, icons, actions |
| `@kurrent-ui/fields` | Form inputs | Text, select, checkbox, radio, number, textarea |
| `@kurrent-ui/layout` | Page structure | Page shells, sidebars, headers, panels, breadcrumbs |
| `@kurrent-ui/forms` | Form logic | Validated form state, working copy data stores |
| `@kurrent-ui/theme` | Theming | Light/dark/high-contrast themes, CSS custom properties |
| `@kurrent-ui/utils` | Utilities | Shared helpers and type utilities |
| `@kurrent-ui/stores` | State | Stencil store primitives |
| `@kurrent-ui/router` | Routing | Stencil router with URL state management |
| `@kurrent-ui/editor` | Code editing | Monaco editor wrapper component |
| `@kurrent-ui/assets` | Static assets | CSS utilities and asset files |

## Component Naming Convention

Components use **web component** custom element tags with version-namespaced prefixes:

- **`c2-*`** — Core components (`c2-button`, `c2-icon`, `c2-tabs`, `c2-modal`)
- **`f2-*`** — Field components with two levels:
  - **Input level** (`f2-text-input`, `f2-select-input`, `f2-checkbox`) — raw interactive element, no label or validation
  - **Field level** (`f2-text-field`, `f2-select-field`, `f2-switch-field`) — wraps input with label, validation messages, and documentation
- **`l2-*`** — Layout components (`l2-sidebar`, `l2-header`, `l2-breadcrumb`, `l2-panel`)

**Important:** `Page` from `@kurrent-ui/layout` is a Stencil **functional component**, not a custom element. Use it only in Stencil TSX: `<Page pageTitle="...">`.

Some layout components accept **data props** (not child elements):
- `l2-nav` takes a `navTree` prop (array of `NavNode`)
- `l2-breadcrumb` takes a `crumbs` prop (array of `Crumb`)

These are standard web components usable in **any framework** — HTML, React, Angular, Vue, Svelte, or Stencil/TSX.

## Quick Decision Guide

| Task | Action |
|------|--------|
| Setting up a new project | Read `references/getting-started.md` |
| Building page layouts | Read `references/layout.md` |
| Adding forms and validation | Read `references/fields.md` |
| Using buttons, tables, modals, tabs | Read `references/components.md` |
| Configuring themes and colors | Read `references/theming.md` |
| Aligning existing UI to Kurrent | Follow the migration protocol below |

## Core Patterns

### Shadow DOM & Styling

Most components use Shadow DOM. Style them via:
1. **CSS custom properties** — Components expose `--variable-name` properties for customization
2. **CSS parts** — Use `::part(name)` to style internal elements
3. **Slots** — Named slots for content composition (`before`, `after`, `documentation`)

### Theme Integration

```typescript
import { theme } from '@kurrent-ui/theme';
```

Apply theme-aware attributes on host elements:

```tsx
<Host high-contrast={theme.isHighContrast()} dark={theme.isDark()}>
```

Four built-in themes: `light`, `dark`, `high_contrast_light`, `high_contrast_dark`. Auto-selection respects `prefers-color-scheme` and `prefers-contrast` media queries.

### Form Pattern

```typescript
import { createValidatedForm } from '@kurrent-ui/forms';

const form = createValidatedForm({
  name: { initialValue: '', validations: [required()] },
});
```

Fields emit `fieldchange` custom events with the new value in `event.detail`. Use `f2-*-field` components (field level) for forms with labels and validation, or `f2-*-input` components (input level) for custom layouts.

### Icon Registration

```typescript
import { iconStore } from '@kurrent-ui/components';
// Register icons before use
iconStore.addIcons(/* icon data */);
```

Display with `<c2-icon icon="icon-name" size={20} />`.

## Migration Protocol: Aligning Existing UI to Kurrent

When aligning an existing application to the Kurrent Design System:

1. **Audit current UI** — Inventory all pages, forms, navigation, and interactive elements
2. **Install packages** — Add required `@kurrent-ui/*` packages (see `references/getting-started.md`)
3. **Set up theming first** — Initialize `@kurrent-ui/theme` and replace hardcoded colors with CSS custom properties (see `references/theming.md`)
4. **Replace layout structure** — Swap app shell, sidebar, header, and page containers with layout components (see `references/layout.md`)
5. **Replace interactive components** — Swap buttons, tables, modals, tabs with `c2-*` components (see `references/components.md`)
6. **Replace form elements** — Swap inputs, selects, checkboxes with `f2-*` fields and wire up form validation (see `references/fields.md`)
7. **Verify** — Check theming in all four modes, test responsive behavior, validate form flows

## Additional Resources

### Reference Files

For detailed component catalogs, CSS tokens, and usage examples, consult:

- **`references/getting-started.md`** — Installation, framework integration, project setup
- **`references/components.md`** — Full catalog of core components (c2-*) with props and usage
- **`references/fields.md`** — Form field components (f2-*), validation, and form patterns
- **`references/layout.md`** — Page structure components (l2-*), navigation, and layout patterns
- **`references/theming.md`** — Theme system, color scheme, CSS custom properties, theme API

### Source of Truth

The design system source code is the definitive reference. When in doubt about component APIs, read the component source files directly from the design-system repository:
- Core components: `packages/components/src/components/`
- Field components: `packages/fields/src/components/`
- Layout components: `packages/layout/src/components/`
- Theme definitions: `packages/theme/src/`
