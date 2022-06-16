const { options } = require("../db/mysql");
const knex = require("knex")(options);

knex.schema
	.createTable("productos", (table) => {
		table.increments("id");
		table.string("title", 30);
		table.float("price");
		table.string("thumbnail", 200);
	})
	.then(() => {
		console.log("creada tabla productos");
		return knex.schema.createTable("chat", (table) => {
			table.increments("id");
			table.string("email", 200);
			table.string("message", 1000);
		});
	})
	.then(() => {
		console.log("tabla de chat creada con exito");
	})
	.catch((err) => console.log(err));
