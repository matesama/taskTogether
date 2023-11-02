import express from 'express';
import 'dotenv/config';
import client from './db/db.js';
import testRouter from './routes/testroutes.js';
import authRouter from './routes/authRouter.js';
import cors from 'cors';

const port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/test', testRouter);
app.use('/api', authRouter);

client.on('connected', () => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
});