import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser())
app.use(express.json());

app.use('/storage', express.static('storage'))

routes(app);
// connect to db
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        // run port
        console.log('DB connection successfully');
        app.listen(process.env.PORT, () => {
            console.log(`[${process.env.PORT}]running`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });
