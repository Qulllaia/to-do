const db = require("../db");
class ToDoController {
  async createToDo(req, res) {
    const { text, user_id, time_start, time_end, date } = req.body;
    const timeStartMiliseconds =
      Number(time_start.split(":")[0]) * 60 * 60 * 1000 +
      Number(time_start.split(":")[1]) * 60 * 1000;
    const timeToFinishMiliseconds =
      Number(time_end.split(":")[0]) * 60 * 60 * 1000 +
      Number(time_end.split(":")[1]) * 60 * 1000 -
      timeStartMiliseconds;
    const todo = await db.query(
      "INSERT INTO todo (text, user_id,time_start,time_to_finish, date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [text, user_id, timeStartMiliseconds, timeToFinishMiliseconds, date]
    );
    res.json(todo.rows[0]);
  }
  async getToDos(req, res) {
    console.log(req.body);
    if (req.body.user_id !== undefined && req.body.date !== undefined) {
      const { user_id, date } = req.body;
      console.log(user_id, date);
      const todos = await db.query(
        "SELECT * FROM todo WHERE user_id = $1 AND date = $2",
        [user_id, date]
      );
      console.log(todos.rows);
      res.json(todos.rows);
    } else {
      res.send("no need data");
    }
  }
  async deleteTodo(req, res) {
    const id = req.params.id;
    console.log(id);
    const todo = await db.query("DELETE FROM todo WHERE id = $1", [id]);
    res.json(todo.rows);
  }
  async updateTodo(req, res) {
    const { id, text } = req.body;
    const todo = await db.query(
      "UPDATE todo SET text = $1 where id = $2 RETURNING *",
      [text, id]
    );
    res.json(todo.rows[0]);
  }
}

module.exports = new ToDoController();
