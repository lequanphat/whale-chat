import * as dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const SERVER_URL = process.env.SERVER_URL;
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;
const corsOptions = {
  credentials: true,
  origin: CLIENT_URL, // Replace CLIENT_URL with your actual URL
};
export {
  PORT,
  MONGO_URL,
  SERVER_URL,
  EMAIL_ADDRESS,
  EMAIL_PASSWORD,
  ACCESS_SECRET,
  REFRESH_SECRET,
  CLIENT_URL,
  corsOptions,
};
