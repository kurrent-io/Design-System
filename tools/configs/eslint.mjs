import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    {
        ignores: ['**/node_modules/', '**/dist/', '**/www/', '**/*.d.ts'],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            'no-undef': 'off',
            'no-mixed-spaces-and-tabs': 'off',
            eqeqeq: ['error', 'always', { null: 'ignore' }],
            quotes: [
                'error',
                'single',
                {
                    avoidEscape: true,
                },
            ],
            'no-console': 'error',
            'no-restricted-syntax': [
                'warn',
                {
                    selector: 'ExportDefaultDeclaration',
                    message: 'Prefer named exports',
                },
            ],
            // successors to `ban-types`, kept at the same severity;
            // interfaces allowed to match the removed `no-empty-interface`: off
            '@typescript-eslint/no-empty-object-type': [
                'warn',
                { allowInterfaces: 'always' },
            ],
            '@typescript-eslint/no-unsafe-function-type': 'warn',
            '@typescript-eslint/no-wrapper-object-types': 'warn',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/explicit-member-accessibility': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-inferrable-types': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    disallowTypeAnnotations: true,
                },
            ],
        },
    },
    {
        files: ['**/*.js', '**/*.cjs'],
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
    {
        // flat config files can only use default exports
        files: ['**/eslint.config.*'],
        rules: {
            'no-restricted-syntax': 'off',
        },
    },
];
