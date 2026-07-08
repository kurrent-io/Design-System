# @kurrent-ui/configs

Configs for the Kurrent design system

## Eslint

A flat config for [ESLint](https://eslint.org/) 10. The required plugins (`typescript-eslint`, `@eslint/js`) are included as dependencies.

```shell
yarn add --dev eslint
```

Hook up the config by creating an `eslint.config.mjs` file in the root of your project:

`eslint.config.mjs`

```js
import kurrentConfig from '@kurrent-ui/configs/eslint';

export default [...kurrentConfig];
```

Extend it by appending your own entries:

```js
import kurrentConfig from '@kurrent-ui/configs/eslint';

export default [
    ...kurrentConfig,
    {
        rules: {
            quotes: 'off',
        },
    },
];
```

If you extend with configs from your own `typescript-eslint` install, make sure it resolves to the same version as this package's, otherwise ESLint will reject the duplicate `@typescript-eslint` plugin registration.

## Prettier

Includes all required dependencies for [prettier](https://prettier.io/).

```shell
yarn add --dev prettier
```

Hook up the config adding the following to your `package.json`:

`package.json`

```json
"prettier": "@kurrent-ui/configs/prettier"
```
