"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const config_1 = require("../../config");
let JwtService = class JwtService {
    signAccessToken(payload, expiryTime = '60m', secret) {
        const accessTokenSecret = secret || config_1.ACCESS_SECRET;
        return jwt.sign(payload, accessTokenSecret, { expiresIn: expiryTime });
    }
    signRefreshToken(payload, expiryTime = '1d', secret) {
        const refreshTokenSecret = secret || config_1.REFRESH_SECRET;
        return jwt.sign(payload, refreshTokenSecret, { expiresIn: expiryTime });
    }
    verifyAccessToken(token, secret) {
        const accessTokenSecret = secret || config_1.ACCESS_SECRET;
        return jwt.verify(token, accessTokenSecret);
    }
    verifyRefreshToken(token, secret) {
        const refreshTokenSecret = secret || config_1.REFRESH_SECRET;
        return jwt.verify(token, refreshTokenSecret);
    }
};
exports.JwtService = JwtService;
exports.JwtService = JwtService = __decorate([
    (0, common_1.Injectable)()
], JwtService);
//# sourceMappingURL=jwt.service.js.map