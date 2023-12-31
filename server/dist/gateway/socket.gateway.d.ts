import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
export declare class SocketGateway implements OnModuleInit {
    server: Server;
    private onlineUsers;
    onModuleInit(): void;
}
