import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { JwtService } from 'src/common/services/jwt.service';
import { UsersModule } from 'src/users/users.module';

@Module({ imports: [UsersModule], providers: [SocketGateway, JwtService] })
export class GatewayModule {}
