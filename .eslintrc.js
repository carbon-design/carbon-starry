module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },

  extends: 'standard',
  plugins: [
    'html'
  ],

  'rules': {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'import/no-webpack-loader-syntax': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
