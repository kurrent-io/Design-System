# @kurrent-ui/configs

## 3.0.0

### Major Changes

- [`67353f01`](https://github.com/kurrent-io/Design-System/commit/67353f01eacc7e1ec0839c6919749024198cd0e8) - `@kurrent-ui/configs/eslint` is now a flat config for ESLint 10 with typescript-eslint 8. The eslintrc format config has been removed.

  The rule set is unchanged in intent. The removed `@typescript-eslint/ban-types` rule is replaced by its v8 successors (`no-empty-object-type`, `no-unsafe-function-type`, `no-wrapper-object-types`) at the same `warn` severity, with empty interfaces still allowed.

  Migrating:

  - Upgrade to `eslint` 10. `typescript-eslint` and `@eslint/js` are now shipped as dependencies of this package, so `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` no longer need to be installed directly.
  - Replace `.eslintrc.js` (and any `.eslintignore`) with an `eslint.config.mjs`:

    ```js
    import kurrentConfig from "@kurrent-ui/configs/eslint";

    export default [...kurrentConfig];
    ```

  The prettier export is unchanged.

## 2.0.0

### Major Changes

- [`e0c7cfdf`](https://github.com/EventStore/Design-System/commit/e0c7cfdf8c14e5bb5183e0c9f8c947e44fb8f368) - Move to @kurrent-ui namespace

## 1.1.1

### Patch Changes

- [`13df770`](https://github.com/EventStore/Design-System/commit/13df7704117fdc1fc483bd2d3c05925e6229b061) - Fix publishing

## 1.1.0

### Minor Changes

- [`a55cd76`](https://github.com/EventStore/Design-System/commit/a55cd76f8a7390867fc0b6d85e8ab8ea4153a75d) - Improvements:

  - `renderLoadingState` prop in the `Page` component now accepts false to render normally.
  - `TableCell` props `exptectedLength` and `variance` for `<c2-loading-text />` rendering.
  - `c2-table` prop `loading` added to indicate `<c2-loading-text />` rendering,.with `loadingRows` props to specify the number of rows to render.

  Bug fixes:

  - Removed `fixStyle: 'inline-type-imports'` from ESLint rules due to compatibility issues with `@typescript-eslint/consistent-type-imports`.
