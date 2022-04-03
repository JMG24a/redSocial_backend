const express = require('express');
const app = express();
const appRoutes = require('./network')
const appDocs = require('./docs')
const errors = require('./middleware/error')
const bodyParser = require('body-parser');

app.use(bodyParser.json());
appRoutes(app)
appDocs(app)

app.use(errors)

app.listen(3001, ()=>{
    console.log('[SERVER] on port 3001 is run')
})