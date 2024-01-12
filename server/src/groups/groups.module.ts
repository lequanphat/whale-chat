import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from 'src/schemas/groups.schema';
import { GroupController } from './controllers/group.controller';
import { GroupService } from './services/group.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
