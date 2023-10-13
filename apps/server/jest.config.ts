import type { Config } from 'jest';

const config: Config = {
  testMatch: ['**/tests/**/*.test.ts'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  // transform: {
  //   '\\.(gql|graphql)$': 'jest-transform-graphql',
  // },
  verbose: true,
};

export default config;

// Client implementation
//   testEnvironment: 'jest-environment-jsdom',
//   testMatch: [
//     '<rootDir>/apps/client/src/**/*.test.ts',
//     '<rootDir>/apps/client/tests/**/*.test.ts',
//   ],
//   preset: 'ts-jest',
//   setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
//   moduleNameMapper: {
//     '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
//       '<rootDir>/__mocks__/file-mock.js',
//     '\\.(css|less)$': '<rootDir>/__mocks__/style-mock.js'
