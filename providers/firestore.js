const { Provider } = require("klasa");
const firebase = require("firebase-admin");

module.exports = class extends Provider {

	constructor(...args) {
		super(...args);
		this.db = null;
	}
	async init() {
		if (this.db) return;

		await firebase.initializeApp({
			credential: firebase.credential.cert(this.client.options.providers.firestore.credentials),
			databaseURL: this.client.options.providers.firestore.databaseURL
		});

		let firestore = new firebase.firestore();
		firestore.settings({ timestampsInSnapshots: true });
		this.db = firestore;
	}

	hasTable(table) {
		return this.db.collection(table).get().then(col => Boolean(col.size));
	}

	createTable(table) {
		return this.db.collection(table);
	}

	getKeys(table) {
		return this.db.collection(table).get().then(snaps => snaps.docs.map(snap => snap.id));
	}

	get(table, id) {
		return this.db.collection(table).doc(id).get().then(snap => this.packData(snap.data(), snap.id));
	}

	has(table, id) {
		return this.db.collection(table).doc(id).get().then(data => data.exists);
	}

	create(table, id, doc = {}) {
		return this.db.collection(table).doc(id).set(this.parseUpdateInput(doc));
	}

	update(table, id, doc) {
		return this.db.collection(table).doc(id).update(this.parseUpdateInput(doc));
	}

	delete(table, id) {
		return this.db.collection(table).doc(id).delete();
	}

	replace(...args) {
		return this.create(...args);
	}

	async getAll(table, filter = []) {
		const data = await this.db.collection(table).get()
			.then(snaps => snaps.docs.map(snap => this.packData(snap.data(), snap.id)));

		return filter.length ? data.filter(nodes => filter.includes(nodes.id)) : data;
	}

	packData(data, id) {
		return {
			...data,
			id
		};
	}

};