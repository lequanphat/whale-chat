"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const jwt_service_1 = require("../services/jwt.service");
let AuthMiddleware = class AuthMiddleware {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    use(req, res, next) {
        console.log('auth middleware here ...');
        cookieParser()(req, res, () => {
            const token = req.cookies?.accessToken;
            if (!token) {
                throw new common_1.HttpException('Un-Authorized', common_1.HttpStatus.FORBIDDEN);
            }
            try {
                const data = this.jwtService.verifyAccessToken(token);
                req.user = data;
                next();
            }
            catch (error) {
                throw new common_1.HttpException('Token has expired', common_1.HttpStatus.FORBIDDEN);
            }
        });
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtService])
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map