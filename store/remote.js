const fetch = require('node-fetch');

function createRemoteDB (host, port){
    const URL = 'http://'+ host + ':' + port;

    const list = (table) => {
        return req('GET', table);
    }

    const find = (table, id) =>{
        return req('GET', table, id)
    }

    const update = (table, body) => {
        return req('PATCH', body)
    }

    const update_insert = (table, body) =>{
        if(body.update){
            return update(table,body)
        }
        return req('POST', table, body)
    }

    const req = (method, table, data) =>{
        let url = URL + '/mysql/v1/' + table;
        let options = {
            method: method,
            headers: {'content-type': 'application/json'},
        }

        if(method === 'GET' && data){
            url += `/${data.id}/${data.option}`
        }else if(data){
            options.body = JSON.stringify(data)
        }

        return new Promise((resolve, reject) => {
             fetch(url,options)
                .then(async(res)=>{
                    const data = await res.json();
                    resolve(data.body)
                })
                .catch(err => {

                    console.log('[ERROR]: ',err)
                    reject(err)
                })
        })
    }

    return {
        list,
        find,
        update_insert
    }
}

module.exports = createRemoteDB;
