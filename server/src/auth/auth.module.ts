import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/users.chema';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { CommonModule } from 'src/common/common.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    CommonModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
