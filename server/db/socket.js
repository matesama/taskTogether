import { Server } from 'socket.io';

const initializeSocket = (server) => {
const io = new Server(server, {
	cors:{
		origin: "http://localhost:8000/",
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
	},
});



let users = [];

const addUser = (userId, socketId) => {
	if (!users.some((user) => user.userId === userId)) {
		users.push({ userId, socketId });
	}
}

const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
}

const getUser = (userId) => {
	return users.find((user) => user.userId === userId);
}


io.on('connection', (socket) => {

	// when connect
	console.log('a user connected');


	// take userId and socketId from user
	socket.on("addUser", (userId) => {
		addUser(userId, socket.id);
		io.emit("getUsers", users);
		console.log('added, Users: ', users);

	})

	// send and get message
	socket.on('sendMessage', ({senderId, receiverId, text}) => {
		const user = getUser(receiverId);
		if (user && user.socketId) {
			io.to(user.socketId).emit("getMessage", {
				senderId,
				text,
			});
		} else {
			console.log('User or user.socketId is undefined:', user);
		}
	})

	// new conversation
    socket.on('newConversation', () => {
        io.emit('newConversation');
		console.log('newConversation');
    })

	// when logout
	socket.on("logout", () => {
		removeUser(socket.id);
		io.emit("getUsers", users);
		console.log('a user logged out, still logged in users: ', users);
	  });
});

return io;

}

export default initializeSocket;