import React, { useState, useEffect } from "react";
import "../css/ModalCreateToDo.css";

const ModalCreateToDo = ({ setNewToDo, setIsModalOpen }) => {
  //   const [toDo, setToDo] = useState({});

  const onSubmitEvent = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setNewToDo({
      text: formData.get("task"),
      "time-start": formData.get("time-start"),
      "time-end": formData.get("time-end"),
    });
    setIsModalOpen(false);
  };
  return (
    <div className="modal-window">
      <form onSubmit={onSubmitEvent}>
        <h2 className="modal-class">Task creater</h2>
        <div className="task-input">
          <input
            name="task"
            className="form-control"
            placeholder="Input the task"
          />
        </div>
        <div className="time-start">
          <label>Choose the start time</label>
          <input name="time-start" type="time" className="form-control" />
        </div>
        <div className="time-end">
          <label>Choose the end time</label>
          <input name="time-end" type="time" className="form-control" />
        </div>
        <div className="btn-container">
          <button className="btn btn-primary" type="submit">
            Set task
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setIsModalOpen(false)}
          >
            Close window
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalCreateToDo;
