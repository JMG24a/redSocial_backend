const { Router } = require('express')
const routerMysql = require('./routers')

const appRouter = (app) => {
    const routerV1 = Router() 
    app.use('/mysql/v1',routerV1)
    routerV1.use(routerMysql)
}

module.exports = appRouter