import { Server } from 'socket.io';
import { CLIENT_URL } from '../config/index.js';

const corsOptions = {
    credentials: true,
    origin: [CLIENT_URL],
};
const socketServer = (server) => {
    // init socket server
    const io = new Server(server, {
        cors: corsOptions,
    });

    global.onlineUsers = new Map();

    io.on('connection', (socket) => {
        console.log(`User connected ${socket.id}`);

        global.chatSocket = socket;
        socket.on('user-connected', (userId) => {
            onlineUsers.set(userId, socket.id);
            console.log(`Add user for Socket ${socket.id}`);
        });
        
        // listening send-message from client to server
        socket.on('send-message', (data) => {
            const sendUserSocket = onlineUsers.get(data.to);
            if (sendUserSocket) {
                // send send-recieve from server to client
                socket.to(sendUserSocket).emit('recieve-message', data);
            }
        });
    });
};
export default socketServer;
