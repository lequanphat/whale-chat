import userRouter from './userRoutes.js';
import messageRouter from './messageRoutes.js';
const routes = (app) => {
    app.use('/api/auth/', userRouter);
    app.use('/api/message/', messageRouter);
};
export default routes;
