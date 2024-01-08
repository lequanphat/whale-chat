import { Module } from '@nestjs/common';
import { ContactService } from './services/contact.service';
import { ContactController } from './controllers/contact.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendRequest, FriendRequestSchema } from 'src/schemas/friendrequest.chema';
import { Relationship, RelationshipSchema } from 'src/schemas/relationship.chema';
import { User, UserSchema } from 'src/schemas/users.chema';
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
      {
        name: FriendRequest.name,
        schema: FriendRequestSchema,
      },
      {
        name: Relationship.name,
        schema: RelationshipSchema,
      },
    ]),
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
