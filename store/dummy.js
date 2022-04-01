const store = {}

const get = (TABLE) => {
    if(!store[TABLE]){
        throw new Error('User not fount')
    }
    return store[TABLE]
}

const find = (TABLE,search,option) => {

    if(!store[TABLE]){
        throw new Error('User not fount')
    }
    const result = store[TABLE].find(item => item[option] === search)
    if(!result){
        throw new Error('Invalid Data')
    }
    return result
}

const add = (TABLE,body) => {
    if(!store[TABLE]){
        store[TABLE] = []
    }
    store[TABLE].push(body[TABLE][0])
    return body
}

const update = (TABLE,body,search,option) => {
    const index = store[TABLE].findIndex(item => item[option] === search)
    if(index === -1){
        throw new Error('User not fount')
    }
    store[index] = {id: search, ...body}
    return store[index]
}

module.exports = {
    get,
    find,
    update,
    add
}


// phpmyadmin:
// image: phpmyadmin/phpmyadmin
// environment:
//   - MYSQL_ROOT_PASSWORD=admin123
//   - PMA_HOST=mysql
// ports:
//   - "8080:80"