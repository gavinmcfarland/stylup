# pHTML phtml-shorthand-utility [<img src="https://phtml.io/logo.svg" alt="pHTML" width="90" height="90" align="right">][phtml]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

Allows you to write shorthand utility classes conviniently while optimising your CSS.

```html
<div class="p-10px,20px pt-50px"></div>
```

Becomes

```html
<div class="p" style="--pr: 20px; --pb: 10px; --pl: 20px; --pt: 50px"></div>
```

Use with your own CSS

```css
.p {
  padding-top: var(--pt, unset);
  padding-right: var(--pr, unset);
  padding-bottom: var(--pb, unset);
  padding-left: var(--pl, unset);
}
```

## Usage

Transform HTML files directly from the command line:

```bash
npx phtml source.html output.html -p phtml-shorthand-utility
```

### Node

Add [pHTML phtml-shorthand-utility] to your project:

```bash
npm install phtml-shorthand-utility --save-dev
```

Use [pHTML phtml-shorthand-utility] to process your HTML:

```js
const phtmlPhthmlShorthandUtility = require('phtml-shorthand-utility');

phtmlPhthmlShorthandUtility.process(YOUR_HTML /*, processOptions, pluginOptions */);
```

Or use it as a [pHTML] plugin:

```js
const phtml = require('phtml');
const phtmlShorthandUtility = require('phtml-shorthand-utility');

phtml([
  phtmlPhthmlShorthandUtility(/* pluginOptions */)
]).process(YOUR_HTML /*, processOptions */);
```

[pHTML phtml-shorthand-utility] runs in all Node environments, with special instructions for:

| [Node](INSTALL.md#node) | [CLI](INSTALL.md#phtml-cli) | [Eleventy](INSTALL.md#eleventy) | [Webpack](INSTALL.md#webpack) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| --- | --- | --- | --- | --- | --- |


[cli-img]: https://img.shields.io/travis/limitlessloop/phtml-shorthand-utility.svg
[cli-url]: https://travis-ci.org/limitlessloop/phtml-shorthand-utility
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/phtmlorg/phtml
[npm-img]: https://img.shields.io/npm/v/phtml-shorthand-utility.svg
[npm-url]: https://www.npmjs.com/package/phtml-shorthand-utility

[pHTML]: https://github.com/phtmlorg/phtml
[pHTML phtml-shorthand-utility]: https://github.com/limitlessloop/phtml-shorthand-utility
