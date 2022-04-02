const {nanoid} = require('nanoid')
const storeDefault = require('../../../store/dummy')
const authController = require('../../auth')
const TABLE = 'users' 

module.exports = (injectStore) => {
    let db = storeDefault
    if(injectStore){
        db = injectStore
    }

    const getUsers = async() => {
        const users = await db.list(TABLE)
        return users
    }

    const findUser = async(tabla,id,option) => {
        if(!id){
            throw new Error('Bad Request')
        }
        const user = await db.find(tabla,id,option)
        return user
    }

    const addUser = async(body) => {
        const id = nanoid()

        const user = {
            id,
            username: body.username,
            name: body.name,
            lastName: body.lastName
        }
        const authUser = {
            id,
            email: body.email,
            password: body.password
        }

        const existsUsername = await findUser(TABLE,body.username,'username');
        if(existsUsername.length > 0){
            return 'username all ready exists'
        }
   
        const existsEmail = await findUser('authorizations',body.email, 'email');
        if(existsEmail.length > 0){
            return 'email all ready exists'
        }

        const isSave = await db.add(TABLE,user)
        if(isSave){
            const success = await authController.addAuthUser(authUser)
            return success
        }
    }

    const updateUser = async(user,body) => {
        if(!user.role || user.role === 'admin'){
            throw new Error('access restring')
        }
        const authUser = await db.find('authorizations',user.sub,'id')
        const infoUser = await db.update('users', body, authUser[0].id_user)
        return infoUser
    }

    const followers = async(from,to) => {
        const userAuth = await findUser('authorizations',from.sub,'id')
        const userInfo = await findUser(TABLE, userAuth[0].id_user, 'id')
        const confirmUser = await findUser(TABLE, to, 'id')
        if(confirmUser.length <= 0){
            throw new Error('this user do not exists')
        }

        const follow = {
            user_from: userInfo[0].id,
            user_to: to
        }

        const res = await db.add('followers',follow)
        return res
    }

    const getFollowers = async(user) => {

        const select = `*`;
        const from = `followers as f`;
        const join = `users as u on f.user_to = u.id`;
        const where = `f.user_from = '${user}'`;

        return await db.query(select,from,join,where)
    }

    return {
        getUsers,
        findUser,
        updateUser,
        addUser,
        followers,
        getFollowers
    }
}