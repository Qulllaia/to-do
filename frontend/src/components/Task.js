import React, { useState, useEffect } from "react";
import "../css/Task.css";
import { updateTask, deleteTask } from "../server";
const Task = ({
  text,
  id,
  setTodos,
  toDos,
  user,
  timeStart,
  timeToEnd,
  localDay,
}) => {
  const [taskText, setTaskText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);
  const fullDay = 24 * 60 * 60 * 1000;
  const documentLimit =
    document.getElementsByClassName("day-hours")[0].offsetWidth / 16;
  useEffect(() => {
    setTaskText(text);
  }, [toDos]);
  return (
    <div
      className="todo"
      style={{
        //Ёбанный костыль и подгонка. Переделать нахуй надо
        marginLeft: `${(documentLimit * timeStart) / fullDay - 0.6}rem`,
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
          onClick={() =>
            deleteTask(id, user, localDay).then((res) => setTodos([...res]))
          }
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
