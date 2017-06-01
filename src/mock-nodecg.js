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
}

class MockNodeCGLogger {
	constructor() {
		this.trace = sinon.spy();
		this.debug = sinon.spy();
		this.info = sinon.spy();
		this.warn = sinon.spy();
		this.error = sinon.spy();
	}
}

class MockNodeCG extends EventEmitter {
	constructor({bundleName} = {}) {
		super();
		this.bundleName = bundleName;
		this.sendMessage = typeof sinon === 'undefined' ? function () {} : sinon.stub();
		this.replicantsMap = new Map();
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
