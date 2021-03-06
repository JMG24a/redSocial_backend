const mysql = require('mysql2')
require('dotenv').config();

const config = {
    SECRET_JWT: process.env.JWT_SECRET,
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'secret',
        database: process.env.MYSQL_DB || 'red_social',
        port: process.env.MYSQL_PORT || '3306',
    },
    serviceMysql:{
        host: process.env.MCS_MYSQL_HOST || 'localhost',
        port: process.env.MCS_MYSQL_PORT || '3002'
    },
    servicePost:{
        port: process.env.MCS_POST_PORT || '3003'
    }
}

module.exports = { config }