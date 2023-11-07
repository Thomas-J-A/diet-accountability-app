import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.GRAPHQL_SCHEMA,
  documents: './src/operations/*.tsx',
  ignoreNoDocuments: true,
  generates: {
    './src/__generated__/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
