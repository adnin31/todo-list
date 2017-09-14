const express = require('express')
const router = express.Router()
const user = require('../controllers/users.js')

router.get('/',user.getData)
router.post('/signin',user.signin)
router.get('/:id',user.getOne)
router.post('/',user.insertData)
router.put('/:id',user.updateData)
router.delete('/:id',user.removeData)


module.exports = router;
