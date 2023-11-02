import express from 'express';
import 'dotenv/config';
import client from './db/db.js';
import testRouter from './routes/testroutes.js';
import conversationRouter from './routes/conversations.js';
import messageRouter from './routes/messages.js';
import userRouter from './routes/users.js';



const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.use('/api/test', testRouter);
app.use('/api/users', userRouter);
app.use('/api/conversations', conversationRouter);
app.use('/api/messages', messageRouter);

client.on('connected', () => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
});