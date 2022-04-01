const bcrypt = require('bcrypt');

const security_password = async(password) =>{
    const hashPassword = await bcrypt.hash(password, 10)
    return hashPassword
}

const confirm_password = async(password, dbPassword) =>{
    const confirm = await bcrypt.compare(password,dbPassword);
    return confirm
}

module.exports = {
    securityP : security_password,
    confirmP: confirm_password
}