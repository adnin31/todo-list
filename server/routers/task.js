const express = require('express')
const router = express.Router()
const task = require('../controllers/task.js')
var auth = require('../helper/auth.js')

router.get('/',task.getData)
router.get('/:id',task.getOne)
router.post('/', auth.authAdmin, task.insertData)
router.put('/:id',task.updateData)
router.delete('/:userid/:taskid',task.removeData)
router.put('/done/:id',task.done)

module.exports = router;
