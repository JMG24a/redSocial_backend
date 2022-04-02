const {Router} = require("express");
const controller = require('../../../store/mysql')

const router = Router();

const list = async(req,res) => {
    try{
        const success = await controller.get(req.params.table)
        res.json(success)
    }catch(err){
        res.json(err)
    }

}

router.get('/:table', list);

module.exports = router;