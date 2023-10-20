import express from 'express'
import dotenv from 'dotenv';
import http from 'node:http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

export default httpServer;

