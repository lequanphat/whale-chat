import { Module } from '@nestjs/common';
import { MessagesController } from './controllers/messages.controller';
import { MessagesService } from './services/messages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Messages, Messageschema } from 'src/schemas/messages.chema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Messages.name,
        schema: Messageschema,
      },
    ]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessageModule {}
