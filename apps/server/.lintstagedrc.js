module.exports = {
  '**/*.ts': [
    () => 'tsc -p ./tsconfig.json --noEmit --skipLibCheck',
    'eslint --fix',
    'prettier --write',
    'jest --config ./jest.config.ts --bail --findRelatedTests --passWithNoTests',
  ],
  '**/*': 'gitleaks protect -v --staged',
};
