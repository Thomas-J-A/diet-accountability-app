module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    '.lintstagedrc.ts',
    'vite.config.ts',
  ],
  overrides: [
    {
      files: ['*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'lastest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      plugins: ['react', 'react-refresh', '@typescript-eslint'],
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'prettier',
      ],
      rules: {
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],
      },
    },
  ],
};
