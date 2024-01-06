import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/users.chema';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { JwtService } from 'src/common/services/jwt.service';
import { Messages, Messageschema } from 'src/schemas/messages.chema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Messages.name,
        schema: Messageschema,
      },
    ]),
  ],
  providers: [UsersService, JwtService],
  controllers: [UsersController],
})
export class UsersModule {}
