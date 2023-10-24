// TODO: stylelint --fix

module.exports = {
  '**/*.ts?(x)': [
    () => 'tsc -p ./tsconfig.json --noEmit --skipLibCheck',
    'eslint --fix',
    'prettier --write',
    // 'jest --config ./apps/client/jest.config.ts --bail --findRelatedTests --passWithNoTests',
  ],
  '**/*': 'gitleaks protect -v --staged',
};
