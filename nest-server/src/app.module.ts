import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URL } from './config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { JwtService } from './common/services/jwt.service';
import { CheckRefreshTokenMiddleware } from './auth/middlewares/checkRefershToken.middleware';
import { GatewayModule } from './gateway/gateway.module';
@Module({
  imports: [MongooseModule.forRoot(MONGO_URL), UsersModule, AuthModule, GatewayModule],
  controllers: [],
  providers: [JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'users*', method: RequestMethod.ALL }, { path: 'auth/logout', method: RequestMethod.GET })
      .apply(CheckRefreshTokenMiddleware)
      .forRoutes({ path: 'auth/refresh-token', method: RequestMethod.GET });
  }
}
