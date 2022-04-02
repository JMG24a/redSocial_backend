const { Router } = require('express');
const validatorHeader = require('../../../middleware/headers');
const response = require('../../response');
const controller = require('../index');
const router = Router();

//internal routes
const list = async(req,res)=>{
    try{
        const success = await controller.getUsers()
        response.success(req,res,success,200)
    }catch(err){
        response.error(req,res,err.message,500,err)
    }
}

const getOne = async(req,res)=>{
    try{
        const {id} = req.params
        const success = await controller.findUser('users',id,'id')
        response.success(req,res,success,200)
    }catch(err){
        response.error(req,res,err.message,500,err)
    }
}

const post = async(req,res)=>{
    try{
        const body = req.body;
        const success = await controller.addUser(body)
        response.success(req,res,success,200)
    }catch(err){
        response.error(req,res,err.message,500,err)
    }
}

const update = async(req,res)=>{
    try{
        const jwt = req.myPayload
        const body = req.body;
        const success = await controller.updateUser(jwt,body)
        response.success(req,res,success,200)
    }catch(err){
        response.error(req,res,err.message,500,err)
    }
}

const follow = async(req,res) => {
    try{
        const jwt = req.myPayload;
        const {id} = req.params;
        const success = await controller.followers(jwt,id);
        response.success(req,res,success,200);
    }catch(err){
        response.error(req,res,err.message,500,err)
    }
}

const getFollow = async(req,res) => {
    try{
        const {id} = req.params;
        const success = await controller.getFollowers(id);
        response.success(req,res,success,200);
    }catch(err){
        response.error(req,res,err.message,500,err)
    }
}


//routes
router.get('/', list);
router.get('/user/:id', getOne);
router.post('/', post);
router.patch('/', validatorHeader() ,update);
router.post('/follower/:id', validatorHeader(), follow);
router.get('/follower/:id', getFollow);
module.exports = router