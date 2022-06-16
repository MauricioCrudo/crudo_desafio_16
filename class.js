const { options } = require("./db/mysql");
const { optionsSql } = require("./db/sqlite");

const knex = require("knex")(options);
const knexSqlite = require("knex")(optionsSql);
class Contenedor {
	constructor(name) {
		this.name = name;
	}
	async save(item) {
		await knex(this.name).insert(item);
		console.log("se ingreso el producto ");
	}

	async getById(id) {
		const item = await knex.from(`${this.name}`).select("*").where("id", id);
		return item;
	}

	async getAll() {
		const items = await knex.from(`${this.name}`).select("*");
		console.log(items);
		return items;
	}

	async deleteById(id) {
		await knex.from(`${this.name}`).where("id", id).del();
		console.log(`se borro el producto con id ${id}`);
	}

	async deleteAll() {
		await knex.from(`${this.name}`).del();
		console.log("se eliminaron todos los productos");
	}
}
module.exports = Contenedor;

class Chat {
	constructor(name) {
		this.name = name;
	}
	async save(item) {
		await knexSqlite(`${this.name}`).insert(item);
	}
	async getAll() {
		const chats = await knexSqlite.from(`${this.name}`).select("*");
		return chats;
	}
}
module.exports = Chat;
