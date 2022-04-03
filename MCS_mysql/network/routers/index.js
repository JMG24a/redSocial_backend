const {Router} = require("express");
const controller = require('../../../store/mysql');
const response = require('../../../network/response');
const req = require("express/lib/request");

const router = Router();

const list = async(req,res) => {
    try{
        const success = await controller.list(req.params.table)
        res.json(success)
    }catch(err){
        res.json(err)
    }
}

const get = async(req,res) => {
    try{
        const {table, id, option} = req.params
        const data = {
            id: id,
            option: option
        }
        const success = await controller.find(table,data)
        response.success(req,res,success,200)
    }catch(err){
        response.error(req, res, 'No Response', 500, err)
    }
}

const insert = async(req,res) => {
    try{
        const { table } = req.params
        const body = req.body
        const success = await controller.add(table,body)
        response.success(req,res,success,200)
    }catch(err){
        response.error(req,res,'Try again later',500)
    }
}

router.get('/:table', list);
router.get('/:table/:id/:option', get);
router.post('/:table', insert);
// router.patch('/', update);

module.exports = router;