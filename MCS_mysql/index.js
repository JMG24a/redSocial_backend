const { config } = require('../config');
const express = require('express');
const appRouter = require('./network');

const app = express();
app.use(express.json());

appRouter(app)

app.listen(config.serviceMysql.port,()=>{
    console.log('[MCS] Connect',config.serviceMysql.port)
})