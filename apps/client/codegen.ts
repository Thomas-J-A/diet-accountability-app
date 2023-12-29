import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.GRAPHQL_SCHEMA,
  documents: './src/operations/*.tsx',
  ignoreNoDocuments: true,
  generates: {
    // Types for hook data and variables
    './src/__generated__/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        scalars: {
          Date: 'Date',
          JSON: 'object',
        },
      },
    },
    // Used to build client schema for apollo-link-scalars
    // which serializes and parses Date values
    './src/__generated__/introspection.json': {
      plugins: ['introspection'],
      config: {
        minify: true,
      },
    },
  },
};

export default config;
