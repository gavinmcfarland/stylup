# Stylup [<img src="https://phtml.io/logo.svg" alt="pHTML" width="90" height="90" align="right">][phtml]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[Stylup] gives your markup super powers.

## Example

Inteligent functional classes which create inline styles based on their arguments.

```html
<div class="p-4,1,*"></div>
```

Stylup transforms into styles.

```html
<style>
.80YQhjgv {
--pt: 4;
--pr: 1;
--pl: 1;
}</style>
<div class="p 80YQhjgv"></div>
```

When paired with your stylesheet becomes very powerful.

```css
.p {
  padding-top: calc(var(--pt, initial) * 1rem);
  padding-right: calc(var(--pr, initial) * 1rem);
  padding-bottom: calc(var(--pb, initial) * 1rem);
  padding-left: calc(var(--pl, initial) * 1rem);
}

.m {
  margin-top: calc(var(--mt, initial) * 1rem);
  margin-right: calc(var(--mr, initial) * 1rem);
  margin-bottom: calc(var(--mb, initial) * 1rem);
  margin-left: calc(var(--ml, initial) * 1rem);
}
```

## Features

- ### Functional Class Names

  Use inteligent functional class names. Seperate arguments with commas. Use a wildcard to skip arguments. See below for [configuring](#configure) your own class names.

  ```html
  <div class="p-4 m-*,auto fl-wrap"></div>
  ```

---

- ### Inline Styles

  Make use of all CSS features inline including hover states and media queries.

  ```html
  <div style="&:hover { color: red; }"></div>
  ```

---

- ### Supports PostCSS

  Add support for PostCSS by including a `postcss.config.js` file in your project.


## Configure

By default `stylup` will look for a file called `stylup.config.js` at the root of your project.

```js
// stylup.config.js
module.exports = [
  {
    property: 'p',
    children: [
      't',
      'r',
      'b',
      'l'
    ],
    style: ({ property, children, args, str }) => {

      if (args.length < 3) args.push(args[0])
      else args.push(args[1])

      for (let [i, side] of children.entries()) {
        str`--${property}${side}: ${args[i]};`
      }

      return str()
    }
  }
  // ...
]
```

## Usage

Add [Stylup] to your project:

```bash
npm install stylup --save-dev
```

Use [Stylup] to process your HTML:

```js
const stylup = require('stylup');

stylup.process(YOUR_HTML /*, processOptions, pluginOptions */);
```

Or use it as a [pHTML] plugin:

```js
const phtml = require('phtml');
const stylup = require('stylup');

phtml([
  stylup(/* pluginOptions */)
]).process(YOUR_HTML /*, processOptions */);
```

[cli-img]: https://img.shields.io/travis/limitlessloop/stylup.svg
[cli-url]: https://travis-ci.org/limitlessloop/stylup
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/phtmlorg/phtml
[npm-img]: https://img.shields.io/npm/v/stylup.svg
[npm-url]: https://www.npmjs.com/package/stylup

[pHTML]: https://github.com/phtmlorg/phtml
[Stylup]: https://github.com/limitlessloop/stylup
