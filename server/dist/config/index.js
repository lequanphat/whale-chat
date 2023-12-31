"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = exports.CLIENT_URL = exports.REFRESH_SECRET = exports.ACCESS_SECRET = exports.EMAIL_PASSWORD = exports.EMAIL_ADDRESS = exports.SERVER_URL = exports.MONGO_URL = exports.PORT = void 0;
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
exports.PORT = PORT;
const MONGO_URL = process.env.MONGO_URL;
exports.MONGO_URL = MONGO_URL;
const SERVER_URL = process.env.SERVER_URL;
exports.SERVER_URL = SERVER_URL;
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
exports.EMAIL_ADDRESS = EMAIL_ADDRESS;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
exports.EMAIL_PASSWORD = EMAIL_PASSWORD;
const ACCESS_SECRET = process.env.ACCESS_SECRET;
exports.ACCESS_SECRET = ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
exports.REFRESH_SECRET = REFRESH_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;
exports.CLIENT_URL = CLIENT_URL;
const corsOptions = {
    credentials: true,
    origin: CLIENT_URL,
};
exports.corsOptions = corsOptions;
//# sourceMappingURL=index.js.map