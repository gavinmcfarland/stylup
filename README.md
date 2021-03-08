# Stylup [<img src="https://phtml.io/logo.svg" alt="pHTML" width="90" height="90" align="right">][phtml]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[Stylup] gives your markup super powers.

- Automatically processes PostCSS in style tags `<style>` and inline styles `style=""`.
- Fully featured CSS can be used inside inline styles.
- Support for functional class names with dynamic arguments.


## Example

Write inteligent functional classes based on their arguments.

```html
<div class="p-4,1,*"></div>
```

Transforms into styles based on your [configuration](#configuration) (not setup by default).

```html
<style>
.80YQhjgv {
  --pt: 4;
  --pr: 1;
  --pl: 1;
}
</style>
<div class="p 80YQhjgv"></div>
```
You can configure class functions to output whatever you like.

When used with a stylesheet it becomes very powerful, requiring minimal pre configuration to work with your design system.

```css
.p {
  padding-top: calc(var(--pt, initial) * 1rem);
  padding-right: calc(var(--pr, initial) * 1rem);
  padding-bottom: calc(var(--pb, initial) * 1rem);
  padding-left: calc(var(--pl, initial) * 1rem);
}
```

## Features

- ### Supports PostCSS

  Add support for PostCSS by including a `postcss.config.js` file in your project.

---

- ### Inline Styles

  Make use of all CSS features inline including hover states and media queries.

  ```html
  <div style="&:hover { color: red; }"></div>
  ```

---

- ### Functional Class Names

  Use inteligent functional class names. Seperate arguments with commas. Use a wildcard to skip arguments. See below for [configuring](#configure) class names.

  ```html
  <div class="p-4 m-*,auto fl-wrap"></div>
  ```
<!-- ---

- ### Pseudo Classes and Media Queries <mark>(planned)</mark>

  Configure support for pseduo classes and media queries.

  ```html
  <div class="h?c-red p-[1,2],4 h?w-1/2"></div>
  ``` -->
---

- ### Custom Syntax

  Customise the syntax used for functional classes by by overiding the default regex pattern. `stylup.process(html, null, options)`;

  ```js
  // Options
  let options = {
    regex: {
      property: /[^-\s]+/,
      number: /[0-9]*\.?[0-9]+|\*/,
      unit: /px|cm|mm|in|pt|pc|em|ex|ch|rem|vw|vh|vmin|vmax/,
      seperator: /,/,
      arg: /0*({{number}})({{unit}})?|(\w+)/,
      args: /(?:({{arg}}){{seperator}}?)+/,
      decl: /({{property}})(?:-({{args}}))?/
		};
  }
  ```

## configuration

By default `stylup` will look for a file called `stylup.config.js` at the root of your project.

```js
// stylup.config.js
module.exports = {
  classes: [
    {
      class: 'p',
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
}
```

## Usage

Add [stylup] to your project:

```bash
npm install stylup --save-dev
```

Use [stylup] to process your HTML:

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

Or to use with Svelte

```js
const stylup = require('stylup');

export default [{
	// ...
    plugins: [
        svelte({
            preprocess:
                [{
                    markup({ content, filename }) {
                        content = content.replace(/(?<=\<[^>]*)=(\{[^{}]*\})/gmi, (match, p1) => {
                            return `="${p1}"`
                        })
                        return stylup.process(content, { from: filename }).then(result => ({ code: result.html, map: null }));
                    }
                }]
        }),
        // ...
```

[cli-img]: https://img.shields.io/travis/limitlessloop/stylup.svg
[cli-url]: https://travis-ci.org/limitlessloop/stylup
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/phtmlorg/phtml
[npm-img]: https://img.shields.io/npm/v/stylup.svg
[npm-url]: https://www.npmjs.com/package/stylup

[pHTML]: https://github.com/phtmlorg/phtml
[Stylup]: https://github.com/limitlessloop/stylup

## Options 

By default block styles also processed. Set this to false to avoid processing them. `stylup.process(html, null, options)`.

```js
// Options
let options = {
  processBlockStyles: false
}
```
