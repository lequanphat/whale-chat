"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("./config");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const auth_middleware_1 = require("./common/middlewares/auth.middleware");
const jwt_service_1 = require("./common/services/jwt.service");
const checkRefershToken_middleware_1 = require("./auth/middlewares/checkRefershToken.middleware");
const gateway_module_1 = require("./gateway/gateway.module");
const messages_module_1 = require("./messages/messages.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'users*', method: common_1.RequestMethod.ALL }, { path: 'auth/logout', method: common_1.RequestMethod.GET }, { path: 'messages*', method: common_1.RequestMethod.ALL })
            .apply(checkRefershToken_middleware_1.CheckRefreshTokenMiddleware)
            .forRoutes({ path: 'auth/refresh-token', method: common_1.RequestMethod.GET });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forRoot(config_1.MONGO_URL), users_module_1.UsersModule, auth_module_1.AuthModule, gateway_module_1.GatewayModule, messages_module_1.MessageModule],
        controllers: [],
        providers: [jwt_service_1.JwtService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map