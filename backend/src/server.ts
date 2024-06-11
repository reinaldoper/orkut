import express = require('express');
import RabbitMQ from './rabbitmq';
import messagingMiddleware from './middlewares/messagingMiddleware';


import routerUser from './routes/userRoute';
import postRouter from './routes/postRoute';
import categoryRouter from './routes/categoryRoute';
import photoRouter from './routes/photosRoute';
import followersRouter from './routes/followerRoute';

import cors = require('cors');

import dotenv from 'dotenv';

dotenv.config();
 
const app = express();

app.use(cors());
app.use(express.json());

async function startServer() {
  try {
      await RabbitMQ.init();
      console.log('RabbitMQ connected');

      app.use(messagingMiddleware);

      app.use('/users', routerUser);
      app.use('/posts', postRouter);
      app.use('/category', categoryRouter);
      app.use('/photos', photoRouter);
      app.use('/followers', followersRouter);

  } catch (error) {
      console.error('Failed to start routes:', error);
      process.exit(1);
  }
}

startServer();

export default app;

