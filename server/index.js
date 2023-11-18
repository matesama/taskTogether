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
      origin: 'http://localhost:5173',
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