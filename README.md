# mock-nodecg [![license](https://img.shields.io/npm/l/mock-nodecg.svg)](https://npm.im/mock-nodecg) [![Build Status](https://travis-ci.org/nodecg/mock-nodecg.svg?branch=master)](https://travis-ci.org/nodecg/mock-nodecg) [![Join the chat at https://gitter.im/nodecg/nodecg](https://badges.gitter.im/nodecg/nodecg.svg)](https://gitter.im/nodecg/nodecg?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[`mock-nodecg`](https://github.com/NodeCG/mock-nodecg) adds the ability to connect to 1-4 instances of OBS (via [`obs-websocket`](https://github.com/Palakis/obs-websocket)) to your NodeCG bundle. It has two parts:
- The backend: [`mock-nodecg`](packages/mock-nodecg), an npm package
    - This is server-side code that runs in Node.js.
- The frontend: [`nodecg-widget-obs`](packages/nodecg-widget-obs), a [Polymer](https://www.polymer-project.org/) element
    - This is client-side code that runs in your browser.

Once your bundle has connected to OBS, you'll have access to a set of Replicants and Messages that you can use to both control OBS and react to events originating from OBS. For example, you could have code that changes based on what scene is active, or implement a "Transition" button that uses a different transition depending on what scene is being transitioned to. There's a lot of possibilities!

You can think of `mock-nodecg` sort of like a set of mixins for your NodeCG bundle. It is meant for use with NodeCG v0.9. This documentation goes over how to install both `mock-nodecg` and `nodecg-widget-obs` with the default settings to get you up and running as fast as possible.

Internally, `mock-nodecg` uses [`obs-websocket-js`](https://github.com/haganbmj/obs-websocket-js) to communicate with `obs-websocket`.

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
