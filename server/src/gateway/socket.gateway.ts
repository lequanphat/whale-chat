import { HttpException, HttpStatus } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { corsOptions } from 'src/config';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { NextFunction } from 'express';
import { JwtService } from 'src/common/services/jwt.service';
import { UsersService } from 'src/users/services/users.service';
@WebSocketGateway({ cors: corsOptions, namespace: 'socket' })
export class SocketGateway implements NestGateway {
  @WebSocketServer() server: Server;
  constructor(
    private readonly jwtService: JwtService,
    private userService: UsersService,
  ) {}
  private onlineUsers: Map<string, { socketId: string; rooms: string[] }> = new Map();

  // init socket
  afterInit() {
    this.server.use((socket: Socket, next: NextFunction) => {
      const isValidUser = this.authenticate(socket);
      if (!isValidUser) {
        return next(new HttpException('error...', HttpStatus.FORBIDDEN)); // Từ chối kết nối
      }
      return next(); // Cho phép kết nối
    });
  }

  // connect
  async handleConnection(client: Socket) {
    const userID = client.handshake.headers.cookie;
    this.onlineUsers.set(userID, { socketId: client.id, rooms: [] });
    await this.userService.setOnlineUser(userID);

    // handle send message
    client.on('send-message', (data) => {
      const sendUserSocket = this.onlineUsers.get(data.to);
      if (sendUserSocket) {
        data.toUser = true;
        client.to(sendUserSocket.socketId).emit('recieve-message', data);
      } else {
        data.toGroup = true;
        client.to(data.to).emit('recieve-message', data);
      }
    });
    // handle send friend request
    client.on('send-friend-request', (data) => {
      const sendUserSocket = this.onlineUsers.get(data.receiveId);
      if (sendUserSocket) {
        client.to(sendUserSocket.socketId).emit('recieve-friend-request', data);
      }
    });

    // handle send accept friend
    client.on('send-accept-friend', (data) => {
      const sendUserSocket = this.onlineUsers.get(data.to);
      if (sendUserSocket) {
        client.to(sendUserSocket.socketId).emit('recieve-accept-friend', data);
      }
    });

    // handle send notification
    client.on('send-notification', (data) => {
      const sendUserSocket = this.onlineUsers.get(data.to);
      if (sendUserSocket) {
        client.to(sendUserSocket.socketId).emit('recieve-notification', data);
      }
    });

    // handle join group
    client.on('join-group', (groupID) => {
      client.join(groupID);
      this.onlineUsers.get(userID).rooms.push(groupID);
      console.log('client join group');
    });
  }

  // disconnect
  async handleDisconnect(client: Socket) {
    console.log('disconnect', client.handshake.headers.cookie);
    const userID = client.handshake.headers.cookie;
    this.onlineUsers.get(userID).rooms.forEach((room) => {
      client.leave(room);
    });
    this.onlineUsers.delete(userID);
    await this.userService.setOfflineUser(userID);
  }

  // authen
  private authenticate(client: Socket) {
    const token = client.handshake.headers.authorization;
    if (token) {
      try {
        const data = this.jwtService.verifyAccessToken(token.split(' ')[1]);
        client.handshake.headers.cookie = data.id;
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}
