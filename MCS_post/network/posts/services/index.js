const store = require('../../../../store/dummy')
const {nanoid} = require('nanoid')


const TABLA = 'posts'

module.exports = (injectStore) => {
    let db = store
    if(injectStore){
        db = injectStore
    }

    const list = async() => {
        return await db.list(TABLA)
    }

    const add = async(id,body) => {

        const post = {
            id: nanoid(),
            title: body.title,
            body: body.body,
            id_user: id
        }

        return await db.add(TABLA,post)
    }

    return {
        list,
        add
    }
}