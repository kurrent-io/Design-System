---
'@kurrent-ui/configs': major
---

`@kurrent-ui/configs/eslint` is now a flat config for ESLint 10 with typescript-eslint 8. The eslintrc format config has been removed.

The rule set is unchanged in intent. The removed `@typescript-eslint/ban-types` rule is replaced by its v8 successors (`no-empty-object-type`, `no-unsafe-function-type`, `no-wrapper-object-types`) at the same `warn` severity, with empty interfaces still allowed.

Migrating:

-   Upgrade to `eslint` 10. `typescript-eslint` and `@eslint/js` are now shipped as dependencies of this package, so `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` no longer need to be installed directly.
-   Replace `.eslintrc.js` (and any `.eslintignore`) with an `eslint.config.mjs`:

    ```js
    import kurrentConfig from '@kurrent-ui/configs/eslint';

    export default [...kurrentConfig];
    ```

The prettier export is unchanged.
