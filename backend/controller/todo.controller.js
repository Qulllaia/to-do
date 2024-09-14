const db = require("../db");
class ToDoController {
  async createToDo(req, res) {
    const { text, user_id } = req.body;
    const todo = await db.query(
      "INSERT INTO todo (text, user_id) VALUES ($1, $2) RETURNING *",
      [text, user_id]
    );
    res.json(todo.rows[0]);
  }
  async getToDos(req, res) {
    const user_id = req.body.id;
    console.log(user_id);
    const todos = await db.query("SELECT * FROM todo WHERE user_id = $1", [
      user_id,
    ]);
    res.json(todos.rows);
  }
  async deleteTodo(req, res) {
    const id = req.params.id;
    console.log(id);
    const user = await db.query("DELETE FROM todo WHERE id = $1", [id]);
    res.json(user.rows);
  }
}

module.exports = new ToDoController();
