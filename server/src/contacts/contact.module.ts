import { Module } from '@nestjs/common';
import { ContactService } from './services/contact.service';
import { ContactController } from './controllers/contact.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendRequest, FriendRequestSchema } from 'src/schemas/friendrequest.chema';
import { Relationship, RelationshipSchema } from 'src/schemas/relationship.chema';
import { User, UserSchema } from 'src/schemas/users.chema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
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
