const remote = require('./remote');
const {config} = require('../config');

module.exports = new remote(config.serviceMysql.host, config.serviceMysql.port)