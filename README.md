# pHTML phthml-shorthand-utility [<img src="https://phtml.io/logo.svg" alt="pHTML" width="90" height="90" align="right">][phtml]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[pHTML phthml-shorthand-utility] lets you ... in HTML.

```html
<example/>

<!-- becomes -->

<example/>
```

## Usage

Transform HTML files directly from the command line:

```bash
npx phtml source.html output.html -p phtml-phthml-shorthand-utility
```

### Node

Add [pHTML phthml-shorthand-utility] to your project:

```bash
npm install phtml-phthml-shorthand-utility --save-dev
```

Use [pHTML phthml-shorthand-utility] to process your HTML:

```js
const phtmlPhthmlShorthandUtility = require('phtml-phthml-shorthand-utility');

phtmlPhthmlShorthandUtility.process(YOUR_HTML /*, processOptions, pluginOptions */);
```

Or use it as a [pHTML] plugin:

```js
const phtml = require('phtml');
const phtmlPhthmlShorthandUtility = require('phtml-phthml-shorthand-utility');

phtml([
  phtmlPhthmlShorthandUtility(/* pluginOptions */)
]).process(YOUR_HTML /*, processOptions */);
```

[pHTML phthml-shorthand-utility] runs in all Node environments, with special instructions for:

| [Node](INSTALL.md#node) | [CLI](INSTALL.md#phtml-cli) | [Eleventy](INSTALL.md#eleventy) | [Webpack](INSTALL.md#webpack) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| --- | --- | --- | --- | --- | --- |

## Options

...

[cli-img]: https://img.shields.io/travis/limitlessloop/phtml-phthml-shorthand-utility.svg
[cli-url]: https://travis-ci.org/limitlessloop/phtml-phthml-shorthand-utility
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/phtmlorg/phtml
[npm-img]: https://img.shields.io/npm/v/phtml-phthml-shorthand-utility.svg
[npm-url]: https://www.npmjs.com/package/phtml-phthml-shorthand-utility

[pHTML]: https://github.com/phtmlorg/phtml
[pHTML phthml-shorthand-utility]: https://github.com/limitlessloop/phtml-phthml-shorthand-utility
