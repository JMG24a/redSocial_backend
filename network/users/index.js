const store = require('../../store/remote-mysql')
const services = require('./services')

const controller = services(store)

module.exports = controller