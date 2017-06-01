# mock-nodecg [![license](https://img.shields.io/npm/l/mock-nodecg.svg)](https://npm.im/mock-nodecg) [![Build Status](https://travis-ci.org/nodecg/mock-nodecg.svg?branch=master)](https://travis-ci.org/nodecg/mock-nodecg) [![Join the chat at https://gitter.im/nodecg/nodecg](https://badges.gitter.im/nodecg/nodecg.svg)](https://gitter.im/nodecg/nodecg?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A mock of some of the NodeCG APIs that can be used in unit tests, for both Node.js and the browser. Meant to be used with NodeCG v0.9.

## Install

`mock-nodecg` is available on both npm and bower, and can be used in both Node.js and the browser.

npm:
```bash
npm install --save-dev mock-nodecg
```

bower:
```bash
bower install --save-dev nodecg/mock-nodecg
```

## Table of Contents

* [Node.js Example](#node-example)
* [web-component-tester Example](#wct-example)
* [Features](#features)
* [Planned Features](#planned-features)
* [Contributing](#contributing)

### <a name="node-example"></a> Node.js Example

See the [`nodecg-utility-obs` tests](https://github.com/nodecg/nodecg-obs/tree/master/packages/nodecg-utility-obs/test) for an example of using `mock-nodecg` in server-side Node.js tests using [AVA](https://github.com/avajs/ava).

### <a name="wct-example"></a> web-component-tester Example

See the [`nodecg-widget-obs` tests](https://github.com/nodecg/nodecg-obs/tree/master/packages/nodecg-widget-obs/test) for an example of using `mock-nodecg` in client-side browser tests using [`web-component-tester`](https://github.com/Polymer/web-component-tester).

### Features

* Mocks `sendMessage`, `listenFor`, `Replicant` and NodeCG's `Logger` class with [`sinon`](http://sinonjs.org) stubs.

### Planned Features

* None currently, but feel free to open an [issue](https://github.com/nodecg/mock-nodecg/issues) or a [pull request](https://github.com/nodecg/mock-nodecg/pulls).

### Contributing

The mock-nodecg team enthusiastically welcomes contributions and project participation! There's a bunch of things you can do if you want to contribute! The [Contributor Guide](CONTRIBUTING.md) has all the information you need for everything from reporting bugs to contributing entire new features. Please don't hesitate to jump in if you'd like to, or even ask us questions if something isn't clear.

All participants and maintainers in this project are expected to follow [Code of Conduct](CODE_OF_CONDUCT.md), and just generally be kind to each other.

Please refer to the [Changelog](CHANGELOG.md) for project history details, too.
