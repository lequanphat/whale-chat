import userRouter from './userRoutes.js';
import messageRouter from './messageRoutes.js';
import authRouter from './authRoutes.js';
const routes = (app) => {
    app.use('/api/auth/', authRouter);
    app.use('/api/user/', userRouter);
    app.use('/api/message/', messageRouter);
};
export default routes;
