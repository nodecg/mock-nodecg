/* global window */

// Native
const EventEmitter = require('events');

// Packages
const sinon = require('sinon');

class MockReplicant extends EventEmitter {
	constructor() {
		super();
		this.value = {};
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
		this.replicantsMap = new Map();
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
		if (this.replicantsMap.has(name)) {
			return this.replicantsMap.get(name);
		}

		const replicant = MockNodeCG.Replicant(); // eslint-disable-line new-cap
		this.replicantsMap.set(name, replicant);

		if (name === '_obs:namespaces') {
			replicant.value = [];
		}

		return replicant;
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

	static Replicant() {
		return new MockReplicant();
	}
}

if (typeof module !== 'undefined') {
	module.exports = MockNodeCG;
}

if (typeof window !== 'undefined') {
	window.MockNodeCG = MockNodeCG;
	window.NodeCG = MockNodeCG;
}
