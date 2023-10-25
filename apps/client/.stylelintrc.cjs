module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  customSyntax: 'postcss-styled-syntax',
  plugins: ['stylelint-declaration-block-no-ignored-properties'],
  rules: {
    'no-empty-source': null,
    'plugin/declaration-block-no-ignored-properties': true,
  },
};
