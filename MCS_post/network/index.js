const {Router} = require('express');
const routerPost = require('./posts/routers') 

const appRouter = (app) => {
    const routerV1 = Router()
    app.use('/post/v1', routerV1)
    routerV1.use('/', routerPost)
}

module.exports = appRouter