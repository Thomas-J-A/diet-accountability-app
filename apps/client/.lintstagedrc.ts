// TODO: stylelint --fix

const config = {
  '**/*.ts?(x)': [
    () => 'tsc -p ./apps/client/tsconfig.json --noEmit --skipLibCheck',
    'eslint --fix',
    'prettier --write',
    // 'jest --config ./apps/client/jest.config.ts --bail --findRelatedTests --passWithNoTests',
  ],
  '**/*': 'gitleaks protect -v --staged',
};

export default config;
