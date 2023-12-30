import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { corsOptions } from 'src/config';

@WebSocketGateway({ cors: corsOptions })
export class SocketGateway implements OnModuleInit {
  @WebSocketServer() server: Server;
  private onlineUsers: Map<string, string> = new Map();
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('User connected', socket.id);
      socket.on('user-connected', (userId) => {
        this.onlineUsers.set(userId, socket.id);
        console.log(`Add user for Socket ${socket.id}`);
      });
      socket.on('send-message', (data) => {
        const sendUserSocket = this.onlineUsers.get(data.to);
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit('recieve-message', data);
        }
      });
    });
  }
}
