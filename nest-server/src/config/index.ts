import * as dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const SERVER_URL = process.env.SERVER_URL;
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
export { PORT, MONGO_URL, SERVER_URL, EMAIL_ADDRESS, EMAIL_PASSWORD };
