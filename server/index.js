import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';

import { authenticateToken } from './middlewares/auth.js';
import errorHandler from './middlewares/errors.js';
import { CLIENT_URL, MONGO_URL, PORT } from './config/index.js';
import socketServer from './socket/socketServer.js';

const app = express();
const corsOptions = {
    credentials: true,
    origin: [CLIENT_URL],
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(authenticateToken);

app.use('/storage', express.static('storage'));

routes(app);
app.use(errorHandler);

// connect to db
mongoose
    .connect(MONGO_URL)
    .then(() => {
        // run port
        console.log('DB connection successfully');
        const server = app.listen(PORT, () => {
            console.log(`[${PORT}]running`);
        });
        socketServer(server);
    })
    .catch((error) => {
        console.log(error.message);
    });
