import { Module } from '@nestjs/common';
import { UsersController } from './users/controllers/users.controller';
import { UsersService } from './users/services/users.service';
import { AuthController } from './auth/controllers/auth.controller';
import { AuthService } from './auth/services/auth.service';

@Module({
  imports: [],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService],
})
export class AppModule {}
