const mysql = require('mysql2');
const {config} = require('../config')

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
} 

let connection

const handleCon = () =>{

    connection = mysql.createConnection(dbConfig)

    connection.connect((err)=>{
        if(err){
            console.error('[DB ERROR]: ',err)
            setTimeout(()=>{
                handleCon();
            },2000)
        }else{
            console.log('[DB] connected')
        }

    })

    connection.on('error', err=>{
        console.error('[DB ERROR]: ',err)
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            handleCon()
        }else{
            throw err
        }
    })
}

handleCon()


const list = (table) => {
    return new Promise ((resolve,reject)=>{
        connection.query(`SELECT * FROM ${table}`,(err,data)=>{
            if(err){
                reject('Error of connection')
            }
            resolve(data)
        })
    });
}

const find = (table,search,option) => {
    return new Promise ((resolve,reject)=>{
        connection.query(`SELECT * FROM ${table} WHERE ${option} = '${search}'`,(err, data) => {
            if(err){
                reject('Error of connect')
            }
            resolve(data)
        })
    })
}

const add = (table,body) => {
    return new Promise ((resolve,reject)=>{
        connection.query(`INSERT INTO ${table} SET ?`, body, (err, data) => {
            if(err){
                reject('Error of connection')
            }
            resolve(data)
        })
    })
}

const update = (table,body,id) => {
    return new Promise ((resolve,reject)=>{
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [body,id], (err, data) => {
            if(err){
                reject('Error of connection')
            }
            resolve(data)
        })
    })
}

const query = (select = '', from = '', join, where) =>{
    return new Promise ((resolve, reject)=>{

        let myQuery = `SELECT ${select} FROM ${from} `
        if(join){
            myQuery += `JOIN ${join} `
        }
        if(where){
            myQuery += `WHERE ${where} `
        }

        connection.query(`${myQuery}`, (err, res) => {
            if (err){
                return reject(err);
            } 
            resolve(res || null);
        })
    })
}


module.exports = {
    list,
    add,
    find,
    update,
    query
}