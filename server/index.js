import express from 'express';
import 'dotenv/config';
import client from './db/db.js';
import testRouter from './routes/testroutes.js';


const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.use('/api', testRouter);

client.on('connected', () => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
});