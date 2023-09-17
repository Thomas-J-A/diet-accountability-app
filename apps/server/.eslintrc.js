// Top level TypeScript config inside override so that
// TypeScript and GraphQL parsers don't do battle
module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  ignorePatterns: [
    'node_modules',
    'build',
    'package-lock.json',
    '.eslintrc.js',
  ],
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      plugins: ['@typescript-eslint'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'prettier',
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_' }],
      },
    },
    {
      files: ['*.ts'],
      processor: '@graphql-eslint/graphql',
    },
    {
      files: ['*.graphql'],
      extends: ['plugin:@graphql-eslint/schema-recommended'],
      // parser: '@graphql-eslint/eslint-plugin',
      // plugins: ['@graphql-eslint'],
    },
  ],
};
