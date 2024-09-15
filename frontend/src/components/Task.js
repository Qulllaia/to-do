import React, { useState, useEffect } from "react";
import "../css/Task.css";
import { updateTask, getUserDataAPI, deleteTask } from "../server";
const Task = ({ text, id, setTodos, user, timeStart, timeToEnd }) => {
  const [taskText, setTaskText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);
  const fullDay = 24 * 60 * 60 * 1000;
  const documentLimit =
    document.getElementsByClassName("day-hours")[0].offsetWidth / 16;

  useEffect(() => {
    console.log(document.getElementsByClassName("day-hours")[0].offsetWidth);
  }, []);

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
          <p className="task-text">{taskText}</p>
        )}

        <button
          className="btn-edit"
          onClick={() => {
            if (isEditing) updateTask(id, taskText);
            setIsEditing(isEditing ? false : true);
          }}
        />
        <button
          className="btn-close"
          onClick={() => deleteTask(id, user).then((res) => setTodos([...res]))}
        />
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
