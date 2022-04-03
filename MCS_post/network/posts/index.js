const store = require('../../../store/mysql');
const service = require('./services')

const controller = service(store)

module.exports = controller