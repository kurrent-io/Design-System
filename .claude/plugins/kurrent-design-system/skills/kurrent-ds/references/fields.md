# Field Components (f2-*) and Form Patterns

Components from `@kurrent-ui/fields` and `@kurrent-ui/forms` for building validated forms.

## Field vs Input: Two-Level Architecture

Every form element has two levels:

| Level | Naming | Includes | Use When |
|-------|--------|----------|----------|
| **Input** | `f2-*-input` (e.g., `f2-text-input`, `f2-select-input`) | Raw interactive element only | Building custom layouts, embedding in tables, or composing manually |
| **Field** | `f2-*-field` (e.g., `f2-text-field`, `f2-select-field`) | Input + label + validation messages + documentation | Standard forms with labels and validation |

**Exceptions:** `f2-checkbox` and `f2-switch` are input-level tags (no `-input` suffix). Their field-level wrappers are `f2-checkbox-field` (if exists) and `f2-switch-field`.

Always prefer **field-level** components in forms. Use **input-level** only for custom layouts.

## Form Architecture

### Creating a Validated Form

```typescript
import { createValidatedForm } from '@kurrent-ui/forms';

const form = createValidatedForm({
  name: {
    initialValue: '',
    validations: [required('Name is required')],
  },
  email: {
    initialValue: '',
    validations: [required(), email('Must be a valid email')],
  },
  role: {
    initialValue: 'viewer',
  },
});
```

### Form Component Pattern (Stencil TSX)

```tsx
<f2-form onSubmit={handleSubmit}>
  <f2-text-field
    label="Name"
    name="name"
    value={form.name}
    messages={form.messages('name')}
    onFieldchange={(e) => form.set('name', e.detail)}
  />
  <f2-text-field
    label="Email"
    name="email"
    value={form.email}
    messages={form.messages('email')}
    onFieldchange={(e) => form.set('email', e.detail)}
  />

  <f2-form-footer>
    <c2-button variant="filled" type="submit" disabled={!form.valid}>
      Save
    </c2-button>
  </f2-form-footer>
</f2-form>
```

### Event Pattern

All field components emit `fieldchange` custom events with the new value in `event.detail`.

In frameworks that don't natively handle custom events (e.g., React), attach listeners via `ref`:

```tsx
// React example
const inputRef = useRef(null);

useEffect(() => {
  const el = inputRef.current;
  const handler = (e) => setName(e.detail);
  el?.addEventListener('fieldchange', handler);
  return () => el?.removeEventListener('fieldchange', handler);
}, []);

return <f2-text-input ref={inputRef} label="Name" value={name} />;
```

## Text Input Components

### f2-text-input / f2-text-field

Single-line text input.

```html
<!-- Input level (no label/validation) -->
<f2-text-input name="username" placeholder="Enter username" value={value} />

<!-- Field level (with label and validation) -->
<f2-text-field
  label="Username"
  name="username"
  placeholder="Enter username"
  value={value}
  messages={validationMessages}
  onFieldchange={handler}
/>
```

### f2-masked-text-input / f2-masked-text-field

Text input with display masking (e.g., passwords, tokens).

```html
<f2-masked-text-field label="API Key" name="apiKey" value={apiKey} onFieldchange={handler} />
```

### f2-typeahead

Text input with autocomplete suggestions.

```html
<f2-typeahead options={suggestions} onFieldchange={handler} />
```

### f2-textarea-input / f2-textarea-field

Multi-line text input.

```html
<f2-textarea-field
  label="Description"
  name="description"
  rows={4}
  value={description}
  onFieldchange={handler}
/>
```

### f2-text-list-field

List of text inputs for managing multiple values.

## Selection Components

### f2-select-input / f2-select-field

Searchable dropdown select.

```html
<f2-select-field
  label="Role"
  name="role"
  options={[
    { value: 'admin', label: 'Admin' },
    { value: 'viewer', label: 'Viewer' },
  ]}
  value={selectedRole}
  onFieldchange={handler}
/>
```

### f2-multi-checkbox-field

Group of checkboxes for selecting multiple values.

```html
<f2-multi-checkbox-field
  label="Notifications"
  name="notifications"
  options={[
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
  ]}
  value={selectedNotifications}
  onFieldchange={handler}
/>
```

## Toggle Components

### f2-checkbox

Single checkbox (input level).

```html
<f2-checkbox name="terms" checked={accepted} onFieldchange={handler}>
  Accept terms
</f2-checkbox>
```

### f2-switch / f2-switch-field

Toggle switch.

```html
<!-- Input level -->
<f2-switch name="feature" checked={enabled} onFieldchange={handler} />

<!-- Field level (with label) -->
<f2-switch-field label="Enable feature" name="feature" checked={enabled} onFieldchange={handler} />
```

### f2-radio-card-input / f2-radio-card-field

Radio selection styled as selectable cards.

```html
<f2-radio-card-field
  label="Plan"
  name="plan"
  options={[
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
  ]}
  value={selectedPlan}
  onFieldchange={handler}
/>
```

## Numeric Input

### f2-number-input / f2-number-field

Numeric input with optional step controls.

```html
<f2-number-field
  label="Quantity"
  name="quantity"
  min={0}
  max={100}
  step={1}
  value={quantity}
  onFieldchange={handler}
/>
```

## Form Structure Components

### f2-form

Form wrapper that handles submission.

```html
<f2-form onSubmit={handleSubmit}>
  <!-- field components -->
</f2-form>
```

### f2-form-footer

Footer area for form action buttons (submit, cancel).

```html
<f2-form-footer>
  <c2-button variant="filled" type="submit">Save</c2-button>
  <c2-button variant="cancel">Cancel</c2-button>
</f2-form-footer>
```

### f2-form-section-divider

Visual divider between form sections.

### f2-validation-messages

Displays validation error messages. Used automatically by field-level components, or manually with input-level components:

```html
<f2-text-input name="email" value={email} invalid={hasErrors} onFieldchange={handler} />
<f2-validation-messages messages={form.messages('email')} />
```

### f2-placeholder-field

Placeholder skeleton for loading states in forms.

## Common Input Props

**Input-level components:**

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Field identifier (required, reflected to attribute) |
| `value` | varies | Current value |
| `placeholder` | `string` | Placeholder text |
| `disabled` | `boolean` | Disable interaction |
| `readonly` | `boolean` | Read-only mode |
| `invalid` | `boolean` | Show error visual state |

**Field-level components** (in addition to input props):

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Field label |
| `messages` | `ValidationMessages` | Validation messages |
| `documentation` | `string` | Help text |
| `documentationLink` | `string` | Link for help text |
| `documentationLinkText` | `string` | Link text for help |

## Common Form Patterns

### Settings Form

```tsx
const form = createValidatedForm({
  displayName: { initialValue: user.name, validations: [required()] },
  email: { initialValue: user.email, validations: [required(), email()] },
  notifications: { initialValue: user.notifications },
});

render() {
  return (
    <f2-form onSubmit={() => save(form.data)}>
      <f2-text-field label="Display Name" name="displayName" value={form.displayName}
        messages={form.messages('displayName')} onFieldchange={e => form.set('displayName', e.detail)} />
      <f2-text-field label="Email" name="email" value={form.email}
        messages={form.messages('email')} onFieldchange={e => form.set('email', e.detail)} />

      <f2-form-section-divider />

      <f2-switch-field label="Email Notifications" name="notifications"
        checked={form.notifications} onFieldchange={e => form.set('notifications', e.detail)} />

      <f2-form-footer>
        <c2-button variant="filled" type="submit" disabled={!form.valid || !form.changed}>Save</c2-button>
        <c2-button variant="cancel" onClick={() => form.reset()}>Reset</c2-button>
      </f2-form-footer>
    </f2-form>
  );
}
```

### Filter Bar (Input Level)

```tsx
<f2-select-input
  name="status"
  options={statusOptions}
  value={filters.status}
  onFieldchange={e => updateFilter('status', e.detail)}
/>
<f2-text-input
  name="search"
  placeholder="Filter by name..."
  value={filters.search}
  onFieldchange={e => updateFilter('search', e.detail)}
/>
```
