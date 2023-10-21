import express from 'express'
import dotenv from 'dotenv';
import http from 'node:http';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import cors from 'cors';

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://127.0.0.1:5500"
    }
});
app.use(cors({
    origin: "http://127.0.0.1:5500"
}));

const connectedUsers = new Map();

io.on('connection', (socket)=>{
    socket.on('authenticate', (userId: string)=>{
        connectedUsers.set(userId, socket);
    });
    socket.on('private_message', (data: {senderId: string, receiverId: string, message: string})=>{
        const {senderId, receiverId, message}=data;

        const senderSocket = connectedUsers.get(senderId);
        const receiverSocket = connectedUsers.get(receiverId);
        console.log(senderSocket)
        console.log(receiverSocket)
        // console.log(senderId, receiverId)
        // console.log(message);
        if(senderSocket && receiverSocket){
            senderSocket.emit('new_message', { senderId, message });
            receiverSocket.emit('new_message', { senderId, message });
        };

        socket.on('disconnect', ()=>{
            const userId = getUserIdBySocket(socket);
            connectedUsers.delete(userId);
        });
    })
})


function getUserIdBySocket(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    for (const [userId, userSocket] of connectedUsers.entries()) {
      if (userSocket === socket) {
        return userId;
      }
    }
    return null;
  }


export default httpServer;

