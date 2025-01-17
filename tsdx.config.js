// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!
const replace = require('@rollup/plugin-replace');
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const tailwindcss = require('tailwindcss');
const tailwindconfig = require('./tailwind.config');

module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, opts) {
    config.plugins.push(
      postcss({
        plugins: [
          tailwindcss(tailwindconfig),
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        inject: true,
        extract: false,
      })
    );
    config.plugins = config.plugins.map(p =>
      p.name === 'replace'
        ? replace({
            'process.env.NODE_ENV': JSON.stringify(opts.env),
            preventAssignment: true,
          })
        : p
    );
    return config; // always return a config.
  },
};
