import express from 'express';
import RabbitMQ from './rabbitmq';
import path from 'path';
import messagingMiddleware from './middlewares/messagingMiddleware';

import routerUser from './routes/userRoute';
import postRouter from './routes/postRoute';
import categoryRouter from './routes/categoryRoute';
import photoRouter from './routes/photosRoute';
import followersRouter from './routes/followerRoute';
import followingRouter from './routes/followingRoute';

import cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
const uploadDir = path.join(__dirname, '../uploads'); 
app.use('/uploads', express.static(uploadDir)); 


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
    app.use('/following', followingRouter);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
