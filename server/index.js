import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import { checkAccessToken } from './middlewares/auth.js';
import session from 'express-session';
import passport from 'passport';
import passportService from './utils/passportService.js';
dotenv.config();

const app = express();
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:9999'],
};

const store = session.MemoryStore();



app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 1000 * 60  },
        store: store,
    }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(checkAccessToken);

app.use('/storage', express.static('storage'));

routes(app);
// connect to db
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        // run port
        console.log('DB connection successfully');
        const server = app.listen(process.env.PORT, () => {
            console.log(`[${process.env.PORT}]running`);
        });
        const io = new Server(server, {
            cors: corsOptions,
        });
        global.onlineUsers = new Map();
        io.on('connection', (socket) => {
            global.chatSocket = socket;
            socket.on('add-user', (userId) => {
                onlineUsers.set(userId, socket.id);
            });
            socket.on('send-msg', (data) => {
                const sendUserSocket = onlineUsers.get(data.to);
                if (sendUserSocket) {
                    socket.to(sendUserSocket).emit('msg-recieve', data);
                }
            });
        });
    })
    .catch((error) => {
        console.log(error.message);
    });
