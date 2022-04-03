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
            console.log('O',options)
        }
        console.log(url)
        return new Promise((resolve, reject) => {
             fetch(url,options)
                .then((res)=>{
                    const data = res.json();
                    resolve(data)
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
