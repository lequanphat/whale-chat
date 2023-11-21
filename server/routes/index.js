import userRouter from './userRoutes.js'
const routes = (app) => {
    app.use('/api/auth/', userRouter)
}
export default routes