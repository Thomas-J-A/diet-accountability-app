module.exports = {
  root: true,
  ignorePatterns: [
    'node_modules',
    'build',
    'package-lock.json',
    '.eslintrc.js',
  ],
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts'],
      processor: '@graphql-eslint/graphql',
    },
    {
      files: ['*.graphql'],
      extends: 'plugin:@graphql-eslint/schema-recommended',
      parserOptions: {
        schema: './src/schema.graphql',
      },
    },
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_' }],
  },
};
