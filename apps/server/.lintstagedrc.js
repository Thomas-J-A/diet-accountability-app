module.exports = {
  '*.ts': [
    () => 'tsc -p ./apps/server/tsconfig.json --noEmit --skipLibCheck',
    'eslint --fix',
    'prettier --write',
    // 'jest --bail --findRelatedTests',
  ],
  '*': 'gitleaks protect -v --staged',
};
