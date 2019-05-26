import Swal from "sweetalert2";
const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

// const name = prompt("What is your name?");

if (name != null) {
	appendMessage("You have joined the chat");
	socket.emit("new-user", name);

	socket.on("chat-message", data => {
		appendMessage(`${data.name}: ${data.message}`);
	});

	socket.on("user-connected", name => {
		appendMessage(`${name} connected`);
	});

	socket.on("user-disconnected", name => {
		// appendMessage(`${name} disconnected`);
		const Toast = Swal.mixin({
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timer: 3000
		});

		Toast.fire({
			type: "info",
			title: `${name} disconnected`
		});
	});

	messageForm.addEventListener("submit", e => {
		e.preventDefault();
		const message = messageInput.value;
		appendMyMessage(`You: ${message}`);
		socket.emit("send-chat-message", message);
		messageInput.value = "";
	});

	function appendMessage(message) {
		const messageElement = document.createElement("div");
		messageElement.setAttribute("class", "message");
		messageElement.innerText = message;
		messageContainer.append(messageElement);
		messageContainer.scrollBy(0, 100);
	}

	function appendMyMessage(message) {
		const messageElement = document.createElement("div");
		messageElement.setAttribute("class", "myMessage");
		messageElement.innerText = message;
		messageContainer.append(messageElement);
		messageContainer.scrollBy(0, 100);
	}
}
