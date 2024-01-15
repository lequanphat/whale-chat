import { Module } from '@nestjs/common';
import { MessagesController } from './controllers/messages.controller';
import { MessagesService } from './services/messages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Messages, Messageschema } from 'src/schemas/messages.chema';
import { User, UserSchema } from 'src/schemas/users.chema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Messages.name,
        schema: Messageschema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessageModule {}
