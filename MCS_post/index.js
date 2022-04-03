const { config } = require('../config')
const express = require('express');
const appRouter = require('./network')
const app = express()

app.use(express.json())

appRouter(app)

app.listen(config.servicePost.port,()=>{
    console.log('connect on port 3003')
})