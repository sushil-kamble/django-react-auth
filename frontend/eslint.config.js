import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';

export default [
    js.configs.recommended,
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            parser: babelParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                requireConfigFile: false,
                babelOptions: {
                    presets: ['@babel/preset-react'],
                },
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': 'warn',
            'react/prop-types': 'off',
        },
        settings: {
            react: {
                version: '18.3',
            },
        },
    },
];
