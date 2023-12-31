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
exports.SocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const config_1 = require("../config");
let SocketGateway = class SocketGateway {
    constructor() {
        this.onlineUsers = new Map();
    }
    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log('User connected', socket.id);
            socket.on('user-connected', (userId) => {
                this.onlineUsers.set(userId, socket.id);
                console.log(`Add user for Socket ${socket.id}`);
            });
            socket.on('send-message', (data) => {
                const sendUserSocket = this.onlineUsers.get(data.to);
                if (sendUserSocket) {
                    socket.to(sendUserSocket).emit('recieve-message', data);
                }
            });
        });
    }
};
exports.SocketGateway = SocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketGateway.prototype, "server", void 0);
exports.SocketGateway = SocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: config_1.corsOptions })
], SocketGateway);
//# sourceMappingURL=socket.gateway.js.map