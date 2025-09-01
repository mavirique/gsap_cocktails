import globals from 'globals';
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Global ignores for build directories
  {
    ignores: ['dist/**'],
  },

  // Base JavaScript configuration
  js.configs.recommended,

  // React-specific configurations
  {
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        // Automatically detect the React version you are using
        version: 'detect',
      },
    },
  },
  // Enables JSX-specific rules
  reactPlugin.configs.flat['jsx-runtime'],

  // Configuration for React Hooks rules
  reactHooks.configs.recommended,

  // Vite-specific plugin for React Refresh (HMR)
  {
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': 'warn',
    },
  },

  // Main configuration block for your JS/JSX files
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Your custom rules
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },

  // This must be the last item to override any conflicting formatting rules
  prettierConfig,
];
