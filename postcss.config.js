/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    require('postcss-import'),
    tailwindcss('./src/tailwind.config.js'),
    require('autoprefixer'),
  ],
};
