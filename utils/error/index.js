const NewError = (message,code) =>{
    let e = new Error(message)
    if(code){
        e.statusCode = 300
    }
    response.error(req, res, message, status, err);
    return e
}

module.exports = {NewError}