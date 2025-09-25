// @ts-check

module.exports = [
  // Ignore patterns
  {
    ignores: [
      'dist/**/*',
      'projects/**/*', 
      'e2e/**/*',
      'setup-jest.ts',
      'node_modules/**/*',
      'coverage/**/*',
      'demo-dist/**/*',
      '**/*.html'
    ]
  },

  // Base configuration for TypeScript files
  {
    files: ['src/**/*.ts', 'demo/**/*.ts', 'build/**/*.ts'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin')
    },
    rules: {
      // Basic TypeScript rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-var-requires': 'error',

      // General rules
      'curly': ['error', 'multi-line'],
      'max-lines': ['error', 1000],
      'no-duplicate-case': 'error',
      'no-duplicate-imports': 'error',
      'no-empty': 'error',
      'prefer-object-spread': 'error'
    }
  }
];
