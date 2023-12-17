import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const MONGO_URL = process.env.MONGO_URL;
const BACKEND_SERVER_PATH = process.env.BACKEND_SERVER_PATH;
const CLIENT_URL = process.env.CLIENT_URL;
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
export {
    PORT,
    CLIENT_URL,
    BACKEND_SERVER_PATH,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    MONGO_URL,
    EMAIL_ADDRESS,
    EMAIL_PASSWORD,
};
