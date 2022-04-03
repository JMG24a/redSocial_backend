const { config } = require('../config');
const express = require('express');
const appRouter = require('./network');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

appRouter(app)

app.listen(config.serviceMysql.port,()=>{
    console.log('[MCS] Connect',config.serviceMysql.port)
})