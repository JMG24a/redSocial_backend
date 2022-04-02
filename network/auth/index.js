const store = require('../../store/mysql')
const services = require('./services')

const controller = services(store)

module.exports = controller