const { verify } = require('../utils/jwt')
const validatorHeader = () => {
    return (req, res, next) => {
        const token = req.headers.authorization || ''
        if(token === ''){
            throw new Error('none authorization ')
        }
        if(token.indexOf('Bearer ') === -1) {
            throw new Error('invalid format');
        }
        const jwt = token.replace('Bearer ', '');
        const payload = verify(jwt)
        req.myPayload = payload
        next()
    }
} 

module.exports = validatorHeader