// src/types/express.d.ts
import { Socket } from 'socket.io';

declare module 'express-serve-static-core' {
  interface Request {
    io: Socket;
  }
}
