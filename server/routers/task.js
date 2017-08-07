const express = require('express')
const router = express.Router()
const task = require('../controllers/task.js')

router.get('/',task.getData)
router.get('/:id',task.getOne)
router.post('/',task.insertData)
router.put('/:id',task.updateData)
router.delete('/:id',task.removeData)


module.exports = router;
