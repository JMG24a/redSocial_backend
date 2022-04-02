const {nanoid} = require('nanoid')
const storeDefault = require('../../../store/dummy');
const security = require('../../../utils/security/password');
const authorization = require('../../../utils/jwt')
const TABLE = 'authorizations'

module.exports = (injectStore) =>{
    let db = storeDefault
    if(injectStore){
        db = injectStore
    }

    const addAuthUser = async(userData) =>{
        const hash = await security.securityP(userData.password)
    
        const id = nanoid()
        const authUser = {
            id,
            id_user: userData.id,
            email: userData.email,
            password: hash
        }
    
        const isSave = await db.add(TABLE,authUser)
        return isSave
    }
    
    const loginAuthUser = async(body) => {
        if(!body.password | !body.email){
            throw new Error('invalid data')
        }
        const password = body.password;
        const email = body.email;
        let userInfo 

        const userAuth = await db.find(TABLE,email,'email')
        const isValid = await security.confirmP(password, userAuth[0].password)

        if(isValid){
            userInfo = await findUser(userAuth[0].id_user)
        }else{
            throw new Error('invalid data')
        }

        const payload = {
            sub: userAuth[0].id,
            role: 'basic',
        }
        const jwt = authorization.sign(payload)

        const user = {
            user: userInfo[0],
            token: jwt
        }
        return user
    }

    const findUser = async(id) => {
        if(!id){
            throw new Error('Bad Request')
        }
        const user = await db.find("users",id,'id')
        return user
    }

    return{
        addAuthUser,
        loginAuthUser
    }
}