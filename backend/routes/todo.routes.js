const Router = require('express')
const router = new Router()
const todoController = require('../controller/todo.controller')

router.post('/todo', todoController.createToDo)
router.get('/todo', todoController.getToDos)



module.exports = router