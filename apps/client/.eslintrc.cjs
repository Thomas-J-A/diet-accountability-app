module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  ignorePatterns: [
    'node_modules',
    'dist',
    '.eslintrc.cjs',
    '.lintstagedrc.ts',
    'vite.config.ts',
    'src/__generated__/',
  ],
  overrides: [
    {
      files: ['src/**/*.ts?(x)'],
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
        '@typescript-eslint/no-misused-promises': [
          2,
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],
      },
    },
    {
      files: ['src/operations/*.tsx'],
      processor: '@graphql-eslint/graphql',
    },
    {
      files: ['*.graphql'],
      extends: ['plugin:@graphql-eslint/operations-recommended'],
    },
  ],
};
