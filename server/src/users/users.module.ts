import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/users.chema';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { Messages, Messageschema } from 'src/schemas/messages.chema';
import { CommonModule } from 'src/common/common.module';

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
    CommonModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
