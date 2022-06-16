const express = require("express");
const fs = require("fs");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { engine } = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// API
const Contenedor = require("./class");
const Chat = require("./class");
const container = new Contenedor("productos");
const chatCont = new Chat("chat");
// CHAT y Tabla
const messages = [
	{ email: "miguel@gmail.com", message: "Hola!" },
	{ email: "maria@gmail.com", message: "Hola miguel!" },
];

const guardarProductos = async (item) => {
	const items = await container.getAll();
	const id = items.length;
	item.id = id + 1;
	await container.save(item);
};

io.on("connection", (socket) => {
	console.log(`new user ${socket.id}`);
	socket.on("chat message", (msg) => {
		chatCont.save(msg);
		io.emit("chat message", msg);
	});
	socket.on("product submit", (item) => {
		console.log(item);
		guardarProductos(item);
		io.emit("product submit", item);
	});
	socket.on("disconnect", () => {
		console.log(`user ${socket.id} disconnected`);
	});
});

// HANDLEBARS
app.engine(
	"hbs",
	engine({
		extname: ".hbs",
		defaultLayout: `${__dirname}/viewsHBS/index.hbs`,
		layoutsDir: `${__dirname}/viewsHBS/layouts`,
		partialsDir: `${__dirname}/viewsHBS/partials`,
	})
);
app.set("views", "./viewsHBS");
app.set("view engine", "hbs");

// metodos
app.get("/", async (req, res) => {
	let cont = await fs.promises.readFile(`./chat.txt`);
	cont = JSON.parse(cont);
	// console.log(data);
	res.render("layouts/main", cont);
});
app.get("/productos", async (req, res) => {
	const content = await container.getAll();
	const data = {
		content: content,
	};

	console.log(data);
	return res.render("layouts/items", data);
});
// app.post("/productos", async (req, res) => {
// 	const items = await container.getAll();
// 	const id = items.length;
// 	let newItem = req.body;
// 	newItem.id = id;
// 	await container.save(newItem);
// 	return res.redirect("/productos");
// });

// PORT

const PORT = 8080;
server.listen(PORT, () => {
	console.log(`listen on port ${PORT}`);
});
