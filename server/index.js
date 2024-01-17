import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import client from './db/db.js';
import testRouter from './routes/testroutes.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/users.js';
import conversationRouter from './routes/conversations.js';
import messageRouter from './routes/messages.js';
import initializeSocket from './db/socket.js';
import http from 'http';


const port = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);

const io = initializeSocket(server);
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credentials',
    ],
    credentials: true,
  })
);
app.use(express.json());

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
  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
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


app.use('/api/test', testRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/conversations', conversationRouter);
app.use('/api/messages', messageRouter);



client.on('connected', () => {
  server.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
});