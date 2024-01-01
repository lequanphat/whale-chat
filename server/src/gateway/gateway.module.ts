import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { JwtService } from 'src/common/services/jwt.service';

@Module({ providers: [SocketGateway, JwtService] })
export class GatewayModule {}
