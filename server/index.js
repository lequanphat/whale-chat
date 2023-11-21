import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors())

app.use(express.json())

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
