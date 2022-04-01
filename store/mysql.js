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


const get = (tabla) => {
    return new Promise ((resolve,reject)=>{
        connection.query(`SELECT * FROM ${tabla}`,(err,data)=>{
            if(err){
                reject('Error of connection')
            }
            resolve(data)
        })
    });
}

const find = (tabla,search,option) => {
    return new Promise ((resolve,reject)=>{
        connection.query(`SELECT * FROM ${tabla} WHERE ${option} = '${search}'`,(err, data) => {
            if(err){
                resolve(res = {data,exists: false})
            }
            resolve(res = {data,exists: true})
        })
    })
}

const add = (tabla,body) => {
    return new Promise ((resolve,reject)=>{
        connection.query(`INSERT INTO ${tabla} SET ?`, body, (err, data) => {
            if(err){
                reject('Error of connection')
            }
            resolve(data)
        })
    })
}


module.exports = {
    get,
    add,
    find
}