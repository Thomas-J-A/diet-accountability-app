module.exports = {
  '**/*.ts': [
    () => 'tsc -p ./apps/server/tsconfig.json --noEmit --skipLibCheck',
    'eslint --fix',
    'prettier --write',
    'jest --config ./apps/server/jest.config.ts --bail --findRelatedTests --passWithNoTests',
  ],
  '**/*': 'gitleaks protect -v --staged',
};
