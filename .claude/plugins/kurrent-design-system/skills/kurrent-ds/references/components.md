# Core Components (c2-*)

Full catalog of components from `@kurrent-ui/components`.

## Buttons

### c2-button

Primary interactive button.

**Variants:** `default` | `filled` | `outline` | `minimal` | `link` | `delete` | `cancel`

```html
<c2-button variant="filled">Save</c2-button>
<c2-button variant="outline">Cancel</c2-button>
<c2-button variant="delete">Delete</c2-button>
<c2-button disabled>Disabled</c2-button>
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `variant` | `ButtonVariant` | Visual style |
| `disabled` | `boolean` | Disable interaction |

**CSS Custom Properties:**
- `--primary-color`, `--secondary-color`, `--tertiary-color`
- `--background-color`, `--foreground-color`, `--border-color`
- `--border-radius`, `--border-width`, `--spacing`
- `--focus-color`, `--transition-duration`

**CSS Parts:** `button`

### c2-button-link

Button styled as a navigable link.

```html
<c2-button-link url="/settings" variant="filled">Go to Settings</c2-button-link>
```

**Additional Props:** `url`, `external` (opens in new tab)

### c2-button-with-confirmation

Button that requires confirmation before executing action.

```html
<c2-button-with-confirmation
  variant="delete"
  confirmText="Are you sure?"
  onRequestConfirmation={handler}
>
  Delete Item
</c2-button-with-confirmation>
```

### c2-thinking-button

Async action button that shows state transitions: default -> thinking -> complete/failed -> default.

```tsx
<c2-thinking-button
  text="Deploy"
  action={async (e) => { await deployService(); }}
  defaultIcon={deployIcon}
  thinkingIcon={spinnerIcon}
  completeIcon={checkIcon}
  failedIcon={errorIcon}
/>
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `action` | `(e: MouseEvent) => Promise<unknown>` | Async action to execute on click |
| `text` | `string` | Button label |
| `variant` | `string` | Button visual style |
| `disabled` | `boolean` | Disable interaction |
| `defaultIcon` | `IconDescription` | Icon in default state |
| `thinkingIcon` | `IconDescription` | Icon while action runs |
| `completeIcon` | `IconDescription` | Icon on success |
| `failedIcon` | `IconDescription` | Icon on failure |

## Actions

### c2-actions

Container for action elements.

```html
<c2-actions>
  <c2-action>Edit</c2-action>
  <c2-action-link url="/details" icon={viewIcon}>View</c2-action-link>
</c2-actions>
```

### c2-action

A clickable action element (typically used in toolbars, dropdowns, or action bars).

```html
<c2-action>Edit</c2-action>
```

### c2-action-link

Action styled as a navigable link with an icon.

```tsx
<c2-action-link url="/streams/123" icon={viewIcon}>
  View Stream
</c2-action-link>
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `url` | `string` | Navigation URL |
| `icon` | `IconDescription` | Icon to display |
| `disabled` | `boolean` | Disable interaction |
| `dot` | `color` | Attention indicator dot |

### c2-action-dropdown

Action with a dropdown menu.

```html
<c2-action-dropdown>
  <span slot="label">More Actions</span>
  <c2-action>Duplicate</c2-action>
  <c2-action>Archive</c2-action>
</c2-action-dropdown>
```

### c2-action-with-confirmation

Action requiring user confirmation before executing.

## Modals

### c2-modal

General-purpose modal dialog with header, body, and footer slots.

```html
<c2-modal>
  <span slot="header">Edit User</span>
  <div>
    <!-- Modal body content -->
  </div>
  <div slot="footer">
    <c2-button variant="filled">Save</c2-button>
    <c2-button variant="cancel">Cancel</c2-button>
  </div>
</c2-modal>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `header` | `boolean` | `true` | Show header section |
| `footer` | `boolean` | `true` | Show footer section |

**Slots:** `header`, default (body), `footer`

**Events:** `requestClose`

Typically used with `c2-portal` to render outside the component DOM tree.

### c2-confirm-modal

Pre-built confirmation dialog.

```tsx
<c2-confirm-modal
  open={showModal}
  heading="Confirm Delete"
  body="This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>
```

## Tables

### c2-table

Data table with sorting, row selection, and customization.

```tsx
<c2-table
  columns={[
    { header: 'Name', cell: (row) => row.name },
    { header: 'Status', cell: (row) => row.status },
  ]}
  data={items}
/>
```

**Variants:**
- **c2-table** — Standard table
- **c2-table-nested** — Table with expandable nested rows
- **c2-table-virtualized** — Virtualized table for large datasets with optional detail rows

**CSS Parts:** `table`, `header`, `row`, `cell`

## Tabs

### c2-tabs

Tabbed content container.

```html
<c2-tabs panels={['Overview', 'Details', 'History']}>
  <div>Overview content</div>
  <div>Details content</div>
  <div>History content</div>
</c2-tabs>
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `panels` | `string[]` | Tab labels |
| `activeParam` | `string` | URL search param to sync active tab |

## Icons

### c2-icon

Displays registered SVG icons.

```html
<c2-icon icon="chevron" size={24} />
<c2-icon icon="spinner" spin />
<c2-icon icon={[NAMESPACE, 'icon-name']} />
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `icon` | `string \| [symbol, string]` | Icon name or namespaced tuple |
| `size` | `number` | Size in pixels |
| `angle` | `number` | Rotation angle |
| `spin` | `boolean` | Animate spinning (auto for "spinner") |
| `spinDirection` | `'clockwise' \| 'counter-clockwise'` | Spin direction |

**CSS Parts:** `icon`

## Feedback & Status

### c2-badge

Status badge / pill label.

```html
<c2-badge variant="success">Active</c2-badge>
<c2-badge variant="error">Failed</c2-badge>
```

### c2-callout

Informational callout block.

```html
<c2-callout variant="warning">
  This operation may take a while.
</c2-callout>
```

**Variants:** `info` | `warning` | `error` | `success`

### c2-toast

Toast notification system. Triggered programmatically.

```typescript
import { toast } from '@kurrent-ui/components';

toast.success({ title: 'Saved', message: 'Changes saved.' });
toast.error({ title: 'Error', message: 'Something went wrong.' });
toast.warning({ title: 'Warning', message: 'Check your input.' });
toast.info({ title: 'Info', message: 'Processing complete.' });
```

### c2-corner-banner

Corner ribbon banner for status labels (e.g., "Beta", "New").

### c2-counter

Numeric counter display.

## Loading

### c2-loading-dots

Animated loading dots indicator.

```html
<c2-loading-dots />
```

### c2-loading-text

Loading placeholder text with animation.

## Navigation & Flow

### c2-pagination

Page navigation for paginated data.

```html
<c2-pagination
  pageCount={10}
  currentPage={1}
  onPageChange={handlePage}
/>
```

### c2-progression

Step progression indicator (wizard-style).

### c2-wizard

Multi-step wizard flow.

## Utility

### c2-popover

Floating content anchored to a trigger element.

```html
<c2-popover>
  <button slot="trigger">Open</button>
  <div>Popover content</div>
</c2-popover>
```

### c2-portal

Renders children into a portal (outside component DOM tree). Use for modals and overlays to avoid z-index and overflow issues.

### c2-copy

Copy-to-clipboard button.

```html
<c2-copy value="text to copy" />
```

### c2-accordian

Expandable/collapsible content section.

```html
<c2-accordian heading="Advanced Options">
  <div>Expanded content here</div>
</c2-accordian>
```

**Note:** The component tag is spelled `c2-accordian` (not "accordion") — this is intentional in the design system.

### c2-resize-observer

Utility component that observes and reports element size changes.
