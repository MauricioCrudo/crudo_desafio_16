const socket = io();
// chat
let chat = document.getElementById("chat-form");
let chatList = document.getElementById("messages");
let chatInput = document.getElementById("chat-input");
let emailInput = document.getElementById("email-input");
let DateTime;
chat.addEventListener("submit", (e) => {
	e.preventDefault();
	if (chatInput.value && emailInput.value) {
		let data = { email: emailInput.value, message: chatInput.value };
		socket.emit("chat message", data);
		chatInput.value = "";
	}
});
socket.on("chat message", (msg) => {
	chatList.innerHTML += `
		<li>${msg.email} : ${msg.message}</li>
	`;
});

// tabla
let table = document.querySelector("#products-table");
let productsForm = document.querySelector("#products-form");
let title = document.querySelector("#title-input");
let price = document.querySelector("#price-input");
let thumbnail = document.querySelector("#thumbnail-input");
let div = document.getElementById("product-list");

productsForm.addEventListener("submit", (e) => {
	e.preventDefault();
	if (title.value && price.value && thumbnail.value) {
		let product = {
			title: title.value,
			price: price.value,
			thumbnail: thumbnail.value,
		};
		socket.emit("product submit", product);
		title.value = "";
		price.value = "";
		thumbnail.value = "";
	}
});
socket.on("product submit", (product) => {
	div.classList.remove("hidden");
	table.innerHTML += `
		<tr>
		<td> ${product.title}</td>
		<td>$${product.price}</td>
		<td>${product.thumbnail}</td>
		</tr>
	`;
});
