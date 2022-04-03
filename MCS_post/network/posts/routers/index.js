const {Router} = require('express');
const controller = require('../index');
const router = Router()

const get = async(req,res) => {
    try {
        const success = await controller.list()
        res.json(success)
    }catch(error) {
        console.log('[ERROR]')
    }
}

const add = async(req,res) => {
    try{
        const body = req.body
        const {id} = req.params
        const success = await controller.add(id,body)
        res.json(success)
    }catch(err){
        console.log('[ERROR]')
    }
}

router.get('/',get);
router.post('/:id', add);


module.exports = router;