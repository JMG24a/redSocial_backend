const request = require('request');

function createRemoteDB (host, port){
    const URL = 'http://'+ host + ':' + port;

    const list = (table) => {
        return req('GET', table);
    }

    // const find = (table, id, option) =>{
    //     return req 
    // }

    // function upsert(table, data)
    // function query(table, query, join)

    const req = (method, table, data) =>{
        let url = URL + '/mysql/v1/' + table;
        let body = "";

        return new Promise((resolve, reject) => {
            request({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url,
                body,
            }, (err, req, body) => {
                if (err) {
                    console.error('Error con la base de datos remota', err);
                    return reject(err.message);
                }

                const resp = JSON.parse(body);
                return resolve(resp);
            })
        })
    }

    return {
        list,
    }
}

module.exports = createRemoteDB;
