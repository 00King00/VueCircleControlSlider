import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import babelParser from '@babel/eslint-parser';

export default [
    js.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parserOptions: {
                parser: babelParser,
                requireConfigFile: false,
                babelOptions: {
                    presets: [],
                },
            },
            globals: {
                window: 'readonly',
                document: 'readonly',
                global: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                requestAnimationFrame: 'readonly',
                cancelAnimationFrame: 'readonly',
            },
        },
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        },
    },
];
