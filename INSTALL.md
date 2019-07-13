# Installing pHTML phthml-shorthand-utility

[pHTML phthml-shorthand-utility] runs in all Node environments, with special instructions for:

| [Node](#node) | [CLI](#phtml-cli) | [Eleventy](#eleventy) | [Webpack](#webpack) | [Gulp](#gulp) | [Grunt](#grunt) |
| --- | --- | --- | --- | --- | --- |

## Node

Add [pHTML phthml-shorthand-utility] to your project:

```bash
npm install phtml-phthml-shorthand-utility --save-dev
```

Use [pHTML phthml-shorthand-utility] to process your HTML:

```js
const phtmlPhthmlShorthandUtility = require('phtml-phthml-shorthand-utility')

phtmlPhthmlShorthandUtility.process(YOUR_HTML /*, processOptions, pluginOptions */)
```

Or use it as a [pHTML] plugin:

```js
const phtml = require('phtml')
const phtmlPhthmlShorthandUtility = require('phtml-phthml-shorthand-utility')

phtml([
  phtmlPhthmlShorthandUtility(/* pluginOptions */)
]).process(YOUR_HTML /*, processOptions */)
```

## CLI

Transform HTML files directly from the command line:

```bash
npx phtml source.html output.html -p phtml-phthml-shorthand-utility
```

Alternatively, add [pHTML phthml-shorthand-utility] to your `phtml.config.js` configuration file:

```js
module.exports = {
  plugins: [
    ['phtml-phthml-shorthand-utility', /* pluginOptions */]
  ]
}
```

## Eleventy

Add [pHTML Eleventy] and [pHTML phthml-shorthand-utility] to your Eleventy project:

```sh
npm install phtml-phthml-shorthand-utility @phtml/11ty --save-dev
```

Use [pHTML Eleventy] and [pHTML phthml-shorthand-utility] in your Eleventy configuration:

```js
const phtml11ty = require('@phtml/11ty')
const phtmlPhthmlShorthandUtility = require('phtml-phthml-shorthand-utility')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(phtml11ty, {
    use: [
      phtmlPhthmlShorthandUtility(/* pluginOptions */)
    ]
  })
}
```

## Webpack

Add [pHTML Loader] to your project:

```bash
npm install phtml-loader --save-dev
```

## Usage

Use [pHTML Loader] and [pHTML phthml-shorthand-utility] in your Webpack configuration:

```js
const phtmlPhthmlShorthandUtility = require('phtml-phthml-shorthand-utility')

module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'phtml-loader', { options: {
              plugins: [
                phtmlPhthmlShorthandUtility(/* pluginOptions */)
              ]
            } }
          }
        ]
      }
    ]
  }
}
```

## Gulp

Add [Gulp pHTML] and [pHTML phthml-shorthand-utility] to your project:

```bash
npm install phtml-phthml-shorthand-utility gulp-phtml --save-dev
```

Use [Gulp pHTML] and [pHTML phthml-shorthand-utility] in your Gulpfile:

```js
const gulp = require('gulp')
const gulpPhtml = require('gulp-phtml')
const phtmlPhthmlShorthandUtility = require('phtml-phthml-shorthand-utility')

gulp.task('html',
  () => gulp.src('./src/*.html').pipe(
    gulpPhtml({
      plugins: [
        phtmlPhthmlShorthandUtility(/* pluginOptions */)
      ]
    })
  ).pipe(
    gulp.dest('dist')
  )
)
```

## Grunt

Add [Grunt pHTML] to your project:

```bash
npm install grunt-phtml --save-dev
```

Use [Grunt pHTML] and [pHTML phthml-shorthand-utility] in your Gruntfile:

```js
const phtmlPhthmlShorthandUtility = require('phtml-phthml-shorthand-utility')

grunt.loadNpmTasks('grunt-phtml')

grunt.initConfig({
  phtml: {
    options: {
      plugins: [
        phtmlPhthmlShorthandUtility(/* pluginOptions */)
      ]
    },
    dist: {
      files: [{
        expand: true,
        src: 'src/*.html',
        dest: 'dest'
      }]
    }
  }
})
```

[Gulp pHTML]: https://github.com/phtmlorg/gulp-phtml
[Grunt pHTML]: https://github.com/phtmlorg/grunt-phtml
[pHTML]: https://github.com/phtmlorg/phtml
[pHTML Eleventy]: https://github.com/phtmlorg/phtml-11ty
[pHTML Loader]: https://github.com/phtmlorg/phtml-loader
[pHTML phthml-shorthand-utility]: https://github.com/limitlessloop/phtml-phthml-shorthand-utility
