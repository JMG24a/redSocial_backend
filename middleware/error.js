const response = require('../network/response');

const errors = (err, req, res, next) =>{
    console.error('[error]', err);

    const message = err.message || 'Internal Error';
    const status = err.statusCode || 400;

    response.error(req, res, message, status, err);
}

module.exports = errors;