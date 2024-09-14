const Router = require("express");
const router = new Router();
const todoController = require("../controller/todo.controller");

router.post("/create_todo", todoController.createToDo);
router.post("/user_todo", todoController.getToDos);
router.delete("/todo/:id", todoController.deleteTodo);
router.put("/todo", todoController.updateTodo);

module.exports = router;
