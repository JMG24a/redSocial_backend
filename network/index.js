const { Router } = require('express');
const userRouter = require('./users/routes');
const authRouter = require('./auth/routes');
const postsRouter = require('./posts/routers');

const appRoutes = (app) => {
    const routerV1 = Router()
    app.use('/api/v1', routerV1);
    routerV1.use('/users', userRouter);
    routerV1.use('/auth', authRouter);
    routerV1.use('/posts', postsRouter)
}


module.exports = appRoutes