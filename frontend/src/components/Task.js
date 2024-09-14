import React, { useState, useEffect } from "react";
import "../css/Task.css";

const Task = ({ text, id, setTodos, getUserDataAPI, timeStart, timeToEnd }) => {
  const [taskText, setTaskText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);
  const fullDay = 24 * 60 * 60 * 1000;
  const documentLimit =
    document.getElementsByClassName("day-hours")[0].offsetWidth / 16;

  const deleteTask = (id) => {
    console.log(id);
    fetch(`http://localhost:8000/api/todo/${id}`, {
      method: "delete",
    }).then((res) => getUserDataAPI().then((res) => setTodos([...res])));
  };

  useEffect(() => {
    console.log(document.getElementsByClassName("day-hours")[0].offsetWidth);
  }, []);

  const updateTask = (id, text) => {
    fetch("http://localhost:8000/api/todo", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, text }),
    }).then((res) => console.log(res));
  };

  return (
    <div
      className="todo"
      style={{
        "margin-left": `${(documentLimit * timeStart) / fullDay}rem`,
      }}
    >
      <div className="todo-interaction">
        {isEditing ? (
          <input
            className="input-edit"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
        ) : (
          <p>{taskText}</p>
        )}

        <button
          className="btn-edit"
          onClick={() => {
            if (isEditing) updateTask(id, taskText);
            setIsEditing(isEditing ? false : true);
          }}
        />
        <button className="btn-close" onClick={() => deleteTask(id)} />
      </div>
      <hr
        className="todo-line"
        style={{
          width: `${(documentLimit * timeToEnd) / fullDay}rem`,
        }}
      ></hr>
    </div>
  );
};

export default Task;
