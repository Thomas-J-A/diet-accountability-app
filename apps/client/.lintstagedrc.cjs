module.exports = {
  '**/*.ts?(x)': [
    () => 'tsc -p ./tsconfig.json --noEmit --skipLibCheck',
    'eslint --fix',
    'prettier --write',
    // 'jest --config ./jest.config.ts --bail --findRelatedTests --passWithNoTests',
  ],
  '**/*.styled.tsx': 'stylelint --fix',
  '**/*': 'gitleaks protect -v --staged',
};
