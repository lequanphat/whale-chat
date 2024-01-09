import { HttpException, HttpStatus } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { corsOptions } from 'src/config';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { NextFunction } from 'express';
import { JwtService } from 'src/common/services/jwt.service';
@WebSocketGateway({ cors: corsOptions, namespace: 'socket' })
export class SocketGateway implements NestGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly jwtService: JwtService) {}
  private onlineUsers: Map<string, string> = new Map();

  afterInit() {
    this.server.use((socket: Socket, next: NextFunction) => {
      const isValidUser = this.authenticate(socket);
      if (!isValidUser) {
        return next(new HttpException('error...', HttpStatus.FORBIDDEN)); // Từ chối kết nối
      }
      return next(); // Cho phép kết nối
    });
  }
  handleConnection(client: Socket) {
    console.log('User connected', client.id);
    client.on('user-connected', (userId) => {
      // Xử lý khi người dùng kết nối
      console.log(`User connected with ID ${userId}`);
      this.onlineUsers.set(userId, client.id);
    });
    // Xử lý khi gửi tin nhắn
    client.on('send-message', (data) => {
      console.log('message from client');
      const sendUserSocket = this.onlineUsers.get(data.to);
      if (sendUserSocket) {
        client.to(sendUserSocket).emit('recieve-message', data);
      }
    });
    // Xử lý khi gửi yêu cầu kết bạn
    client.on('send-friend-request', (data) => {
      console.log('friend request from client');
      const sendUserSocket = this.onlineUsers.get(data.receiveId);
      if (sendUserSocket) {
        client.to(sendUserSocket).emit('recieve-friend-request', data);
      }
    });
  }
  private authenticate(client: Socket) {
    console.log('verify token');
    const token = client.handshake.headers.authorization;
    if (token) {
      try {
        this.jwtService.verifyAccessToken(token.split(' ')[1]);
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}
