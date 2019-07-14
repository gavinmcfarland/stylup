# pHTML Utility Class [<img src="https://phtml.io/logo.svg" alt="pHTML" width="90" height="90" align="right">][phtml]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[pHTML Utility Class] allows you to write utility classes conveniently while optimising your CSS.

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
npx phtml source.html output.html -p phtml-utility-class
```

### Node

Add [pHTML Utility Class] to your project:

```bash
npm install phtml-utility-class --save-dev
```

Use [pHTML Utility Class] to process your HTML:

```js
const phtmlUtilityClass = require('phtml-utility-class');

phtmlUtilityClass.process(YOUR_HTML /*, processOptions, pluginOptions */);
```

Or use it as a [pHTML] plugin:

```js
const phtml = require('phtml');
const phtmlUtilityClass = require('phtml-utility-class');

phtml([
  phtmlUtilityClass(/* pluginOptions */)
]).process(YOUR_HTML /*, processOptions */);
```

[pHTML Utility Class] runs in all Node environments, with special instructions for:

| [Node](INSTALL.md#node) | [CLI](INSTALL.md#phtml-cli) | [Eleventy](INSTALL.md#eleventy) | [Webpack](INSTALL.md#webpack) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| --- | --- | --- | --- | --- | --- |


[cli-img]: https://img.shields.io/travis/limitlessloop/phtml-utility-class.svg
[cli-url]: https://travis-ci.org/limitlessloop/phtml-utility-class
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/phtmlorg/phtml
[npm-img]: https://img.shields.io/npm/v/phtml-utility-class.svg
[npm-url]: https://www.npmjs.com/package/phtml-utility-class

[pHTML]: https://github.com/phtmlorg/phtml
[pHTML Utility Class]: https://github.com/limitlessloop/phtml-utility-class
