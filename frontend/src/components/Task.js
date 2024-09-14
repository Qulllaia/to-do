import React from "react";
import "../css/Task.css";

const Task = ({ text, id, setTodos, getUserDataAPI }) => {
  const deleteTask = (id) => {
    console.log(id);
    fetch(`http://localhost:8000/api/todo/${id}`, {
      method: "delete",
    }).then((res) => getUserDataAPI().then((res) => setTodos([...res])));
  };

  return (
    <div className="todo">
      <p>{text}</p>
      <button className="btn-edit" />
      <button className="btn-close" onClick={() => deleteTask(id)} />
    </div>
  );
};

export default Task;
