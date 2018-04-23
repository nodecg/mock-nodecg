/* global window */

// Native
const EventEmitter = require('events');

// Packages
const sinon = require('sinon');

const declaredReplicants = {};

class MockReplicant extends EventEmitter {
	constructor(name, namespace) {
		if (!name) {
			throw new Error('You must provide a name.');
		}

		if (!namespace) {
			throw new Error('You must provide a namespace.');
		}

		// If replicant already exists, return that.
		if ({}.hasOwnProperty.call(declaredReplicants, namespace)) {
			if ({}.hasOwnProperty.call(declaredReplicants[namespace], name)) {
				return declaredReplicants[namespace][name];
			}
		} else {
			declaredReplicants[namespace] = {};
		}

		super();
		this.name = name;
		this.namespace = namespace;

		declaredReplicants[namespace][name] = this;

		// Prevents one-time change listeners from potentially being called twice.
		// https://github.com/nodecg/nodecg/issues/296
		const originalOnce = this.once.bind(this);
		this.once = (event, listener) => {
			if (event === 'change' && declaredReplicants[namespace][name] && this.value !== undefined) {
				return listener(this.value);
			}

			return originalOnce(event, listener);
		};

		/* When a new "change" listener is added, chances are that the developer wants it to be initialized ASAP.
		 * However, if this replicant has already been declared previously in this context, their "change"
		 * handler will *not* get run until another change comes in, which may never happen for Replicants
		 * that change very infrequently.
		 * To resolve this, we immediately invoke all new "change" handlers if appropriate.
		 */
		this.on('newListener', (event, listener) => {
			if (event === 'change' && declaredReplicants[namespace][name] && this.value !== undefined) {
				listener(this.value);
			}
		});
	}

	validate() {
		return true;
	}
}

class MockNodeCGLogger {
	constructor() {
		this.trace = typeof sinon === 'undefined' ? function () {} : sinon.spy();
		this.debug = typeof sinon === 'undefined' ? function () {} : sinon.spy();
		this.info = typeof sinon === 'undefined' ? function () {} : sinon.spy();
		this.warn = typeof sinon === 'undefined' ? function () {} : sinon.spy();
		this.error = typeof sinon === 'undefined' ? function () {} : sinon.spy();
	}
}

class MockNodeCG extends EventEmitter {
	constructor({bundleName} = {}) {
		super();
		this.bundleName = bundleName;
		this.sendMessage = typeof sinon === 'undefined' ? function () {} : sinon.stub();
		this.mount = typeof sinon === 'undefined' ? function () {} : sinon.stub();
		this.log = new MockNodeCGLogger();
		this.util = {
			authCheck(req, res, next) {
				return next();
			}
		};
	}

	get Logger() {
		return MockNodeCGLogger;
	}

	Replicant(name) {
		return MockNodeCG.Replicant(name, this.bundleName); // eslint-disable-line new-cap
	}

	listenFor(messageName, handler) {
		this.on(messageName, handler);
	}

	unlisten(messageName, handler) {
		const listeners = this.listeners(messageName);
		if (listeners.includes(handler)) {
			this.removeListener(messageName, handler);
			return true;
		}

		return false;
	}

	static Replicant(...args) {
		return new MockReplicant(...args);
	}
}

if (typeof module !== 'undefined') {
	module.exports = MockNodeCG;
}

if (typeof window !== 'undefined') {
	window.MockNodeCG = MockNodeCG;
	window.NodeCG = MockNodeCG;
}
