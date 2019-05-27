const io = require("socket.io")(3000);
const users = {};

io.on("connection", socket => {
	socket.join("Room 1");
	socket.on("new-user", name => {
		users[socket.id] = name;
		socket.broadcast.emit("user-connected", name);
		// io.to("Room 1").emit("user-connected", name);
	});

	socket.on("send-chat-message", message => {
		socket.broadcast.emit("chat-message", {
			message: message,
			name: users[socket.id]
		});
		// io.to("Room1").emit("chat-message", {
		// 	message: message,
		// 	name: users[socket.id]
		// });
	});

	socket.on("disconnect", () => {
		socket.broadcast.emit("user-disconnected", users[socket.id]);
		delete users[socket.id];
		// io.to("Room 1").emit("user-disconnected", users[socket.id]);
		// console.log();
		// delete users[socket.id];
	});
});
