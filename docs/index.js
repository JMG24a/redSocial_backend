const swagger = require('swagger-ui-express')
const swaggerDocs = require('../network/swagger.json')

const docs = (app) => {
    app.use('/docs',swagger.serve, swagger.setup(swaggerDocs))
}

module.exports = docs