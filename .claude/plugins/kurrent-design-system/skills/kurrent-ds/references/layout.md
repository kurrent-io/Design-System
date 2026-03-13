# Layout Components and Page Structure

Components from `@kurrent-ui/layout` for building application shells and page structure.

## Application Shell (Stencil TSX)

A typical Kurrent application shell in Stencil:

```tsx
import { Page } from '@kurrent-ui/layout';
import type { NavTree, Crumb } from '@kurrent-ui/layout';

const navTree: NavTree = [
  { title: 'Dashboard', url: '/dashboard' },
  { title: 'Streams', url: '/streams' },
  {
    title: 'Settings',
    children: [
      { title: 'General', url: '/settings/general' },
      { title: 'Users', url: '/settings/users' },
    ],
  },
];

render() {
  return [
    <l2-header>
      <l2-logo slot="left" />
      <l2-header-dropdown slot="right" label="User">
        <c2-action>Profile</c2-action>
        <c2-action>Logout</c2-action>
      </l2-header-dropdown>
      <l2-theme-dropdown slot="right" />
    </l2-header>,

    <l2-sidebar>
      <l2-nav navTree={navTree} />
      <l2-sidebar-dropdown slot="footer" label="Help">
        <c2-action>Documentation</c2-action>
      </l2-sidebar-dropdown>
    </l2-sidebar>,

    <Page pageTitle="Dashboard">
      {/* Page content */}
    </Page>,
  ];
}
```

## Page Component (Functional Component)

**Important:** `Page` is a Stencil **functional component** exported from `@kurrent-ui/layout`. It is NOT a custom element tag. Use it only in Stencil TSX.

```tsx
import { Page } from '@kurrent-ui/layout';
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `pageTitle` | `string` | Document title and page heading |
| `crumbs` | `Crumb[]` | Breadcrumb trail data |
| `state` | `PageState` | `'loading'` \| `'ready'` \| `['error', unknown]` |
| `empty` | `boolean` | Show empty state |
| `renderEmptyState` | `FunctionalComponent` | Custom empty state renderer |
| `renderErrorState` | `FunctionalComponent<ErrorStateProps>` | Custom error state renderer |
| `renderLoadingState` | `FunctionalComponent \| false` | Custom loading renderer, or `false` to disable |
| `headerTitle` | `string \| false` | Override header text, or `false` to hide |
| `headerRight` | `FunctionalComponent` | Content for the right side of the page header |
| `progressBarId` | `string` | Loading bar ID (defaults to `'page'`) |

**Usage with state management:**

```tsx
<Page
  pageTitle="Users"
  state={loading ? 'loading' : error ? ['error', error] : 'ready'}
  crumbs={[
    { path: '/admin', name: 'Admin' },
    { path: '/users', name: 'Users' },
  ]}
>
  <c2-table columns={columns} data={users} />
</Page>
```

**For non-Stencil frameworks:** Build the page layout manually using `l2-header`, `l2-sidebar`, `l2-breadcrumb`, `l2-panel`, and standard HTML elements. The `Page` functional component handles wiring these together in Stencil.

## Header

### l2-header

Application top bar with slot-based composition.

```html
<l2-header>
  <l2-logo slot="left" />
  <span slot="center">App Name</span>
  <l2-theme-dropdown slot="right" />
</l2-header>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `header` | `boolean` | `true` | Show/hide header section |
| `footer` | `boolean` | `true` | Show/hide footer section |

**Slots:** `left`, `center`, `right`, `under`, `backdrop`

**CSS Parts:** `header`, `left`, `center`, `right`, `under`, `backdrop`

### l2-header-dropdown

Dropdown menu in the header.

```html
<l2-header-dropdown label="Account">
  <c2-action>Profile</c2-action>
  <c2-action>Sign out</c2-action>
</l2-header-dropdown>
```

### l2-logo

Brand logo component. Place in header's `left` slot.

## Sidebar Navigation

### l2-sidebar

Side navigation panel using slots.

```html
<l2-sidebar>
  <l2-nav navTree={navTree} />
</l2-sidebar>
```

**Slots:** default (main content), `after` (content after aside)

Auto-manages `--layout-sidebar-width` CSS variable based on measured width.

### l2-nav

Navigation component driven by a **data prop** (not child elements).

```tsx
import type { NavTree } from '@kurrent-ui/layout';

const navTree: NavTree = [
  { title: 'Home', url: '/home' },
  { title: 'Streams', url: '/streams' },
  {
    title: 'Admin',
    children: [
      { title: 'Users', url: '/admin/users' },
      { title: 'Settings', url: '/admin/settings' },
    ],
  },
];

<l2-nav navTree={navTree} />
```

**NavTree Types:**

```typescript
type NavTree = NavNode[];
type NavNode = NavParentNode | NavLeafNode;

interface NavLeafNode {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  match?: string;      // custom active-match pattern
  exact?: boolean;     // exact URL match for active state
}

interface NavParentNode {
  title: string;
  disabled?: boolean;
  children: NavNode[];
}
```

### l2-sidebar-dropdown

Dropdown menu within the sidebar.

```html
<l2-sidebar-dropdown label="Workspace">
  <c2-action>Switch workspace</c2-action>
</l2-sidebar-dropdown>
```

## Content Containers

### l2-panel

Content panel with optional header.

```html
<l2-panel>
  <l2-panel-header>
    <span slot="title">Recent Events</span>
    <c2-button slot="actions" variant="minimal">Refresh</c2-button>
  </l2-panel-header>
  <div>Panel content</div>
</l2-panel>
```

### l2-panel-header

Header for panels. **Slots:** `title`, `actions`

### l2-layout-section

Section container for grouping related content.

### l2-layout-hr

Horizontal rule divider between sections.

### l2-layout-auto-label

Auto-labeled layout for key-value display.

### l2-page-title

Page title display component.

## Breadcrumb

### l2-breadcrumb

Breadcrumb trail driven by a **data prop** (not child elements).

```tsx
import type { Crumb } from '@kurrent-ui/layout';

const crumbs: Crumb[] = [
  { path: '/streams', name: 'Streams' },
  { path: '/orders', name: 'Orders' },
];

<l2-breadcrumb crumbs={crumbs} />
```

**Crumb Type:**

```typescript
interface Crumb {
  path: string;   // relative path from previous crumb
  name: string;   // display text
}
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `crumbs` | `Crumb[]` | Array of breadcrumb items |
| `noValidate` | `boolean` | Disable route validation warnings |

## Navigation Components

### l2-tab-bar

Tab navigation bar for sub-sections of a page.

```html
<l2-tab-bar
  tabs={['Overview', 'Events', 'Subscriptions']}
  activeTab={currentTab}
  onTabChange={handler}
/>
```

### l2-toolbar

Toolbar for page-level actions and filters.

```html
<l2-toolbar>
  <c2-button variant="filled">Create</c2-button>
  <f2-text-input placeholder="Search..." />
</l2-toolbar>
```

## Theming Controls

### l2-theme-dropdown

Dropdown for switching between themes. Place in the header.

```html
<l2-theme-dropdown />
```

### l2-theme-picker

Full theme picker UI (expanded, not dropdown).

## Status & Empty States

### l2-display-error

Error display for page-level errors.

```html
<l2-display-error message="Unable to load data" details="Connection timed out" />
```

### l2-empty-state

Empty state display when no data is available.

```html
<l2-empty-state heading="No events yet" message="Events will appear here once created." icon="events" />
```

### l2-loading-bar

Global loading progress bar, typically at the top of the app.

## Layout Utility Components

| Component | Purpose |
|-----------|---------|
| `l2-layout-section` | Section grouping |
| `l2-layout-hr` | Horizontal divider |
| `l2-layout-auto-label` | Key-value auto-labeling |
| `l2-layout-link` | Layout-styled link |
| `l2-layout-button` | Layout-styled button |
| `l2-sized-panel` | Panel with fixed sizing |

## Common Layout Patterns

### Dashboard Page (Stencil TSX)

```tsx
<Page pageTitle="Dashboard">
  <l2-toolbar>
    <f2-select-field label="Time range" options={timeRanges} value={range} onFieldchange={handler} />
  </l2-toolbar>

  <l2-panel>
    <l2-panel-header>
      <span slot="title">Recent Activity</span>
    </l2-panel-header>
    <c2-table columns={columns} data={activities} />
  </l2-panel>
</Page>
```

### Detail Page with Breadcrumbs (Stencil TSX)

```tsx
<Page
  pageTitle={stream.name}
  crumbs={[
    { path: '/streams', name: 'Streams' },
    { path: `/${stream.id}`, name: stream.name },
  ]}
>
  <l2-tab-bar tabs={['Events', 'Subscriptions', 'Settings']} activeTab={tab} onTabChange={setTab} />

  {tab === 'Events' && <EventsList streamId={stream.id} />}
  {tab === 'Settings' && <StreamSettings stream={stream} />}
</Page>
```

### Settings Page (Stencil TSX)

```tsx
<Page pageTitle="Settings">
  <l2-panel>
    <l2-panel-header>
      <span slot="title">General</span>
    </l2-panel-header>
    <f2-form onSubmit={saveGeneral}>
      <f2-text-field label="Cluster Name" name="name" value={settings.name} onFieldchange={handler} />
      <l2-layout-hr />
      <f2-switch-field label="Maintenance Mode" name="maintenance" checked={settings.maintenance} onFieldchange={handler} />
      <f2-form-footer>
        <c2-button variant="filled" type="submit">Save</c2-button>
      </f2-form-footer>
    </f2-form>
  </l2-panel>
</Page>
```
