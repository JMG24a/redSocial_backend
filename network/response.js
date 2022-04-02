const success = (req, res, message = "Success", status = 200) => {
    res.status(status).json({
        error: "",
        body: message,
    })
}

const error = (req, res, message = "Error undefined", status = 500, e) => {
    console.error('[RESPONSE_ERROR]',e)
    res.status(status).json({
        error: "",
        body: message,
    });
}

module.exports = {
    success,
    error
}