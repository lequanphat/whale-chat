import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URL } from './config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { CheckRefreshTokenMiddleware } from './auth/middlewares/checkRefershToken.middleware';
import { GatewayModule } from './gateway/gateway.module';
import { MessageModule } from './messages/messages.module';
import { RoleGuard } from './common/guards/role.guard';
import { ContactModule } from './contacts/contact.module';
import { CommonModule } from './common/common.module';
import { NotificationModule } from './notifications/notifications.module';
import { GroupModule } from './groups/groups.module';
@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL),
    UsersModule,
    AuthModule,
    GatewayModule,
    MessageModule,
    ContactModule,
    CommonModule,
    NotificationModule,
    GroupModule,
  ],
  controllers: [],
  providers: [RoleGuard],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'users*', method: RequestMethod.ALL },
        { path: 'auth/logout', method: RequestMethod.GET },
        { path: 'messages*', method: RequestMethod.ALL },
        { path: 'contacts*', method: RequestMethod.ALL },
        { path: 'notifications*', method: RequestMethod.ALL },
        { path: 'groups*', method: RequestMethod.ALL },
      )
      .apply(CheckRefreshTokenMiddleware)
      .forRoutes({ path: 'auth/refresh-token', method: RequestMethod.GET });
  }
}
