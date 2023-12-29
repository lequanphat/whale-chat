import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URL } from './config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot(MONGO_URL), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
