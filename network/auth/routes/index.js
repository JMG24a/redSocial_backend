const { Router } = require('express');
const router = Router();
const response = require('../../response');
const controller = require('../index')

const login = async(req, res) => {
    try{    
        const body = req.body
        const success = await controller.loginAuthUser(body)
        response.success(req, res, success, 200)
    }catch(err){
        response.error(req, res, err.message, 404,err)
    }
}

router.post('/login', login)
module.exports = router;