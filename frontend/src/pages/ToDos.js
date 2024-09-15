import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../css/ToDos.css";
import ModalCreateToDo from "../components/ModalCreateToDo";
import Task from "../components/Task";
import { postNewToDo, getUserDataAPI } from "../server";

export const ToDos = () => {
  const user = useSelector((store) => store.user);
  const [todos, setTodos] = useState([]);
  const [newToDo, setNewToDo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState();
  const [selectedDay, setSelectedDay] = useState();

  useEffect(() => {
    getUserDataAPI(user).then((res) => setTodos([...res]));
    console.log(typeof todos);
  }, [user]);

  useEffect(() => {
    if (newToDo !== null) {
      postNewToDo(newToDo, user).then((res) => setTodos([...res]));
    }
  }, [newToDo]);

  return (
    <div className="todo-list">
      <div className="controls">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          Add ToDo
        </button>
        <div className="calendar">
          <p className="month">Сентябрь</p>
          <div className="days">
            {[...Array(31)].map((_, index) => (
              <div
                className={`${index === selectedDay ? "selected-" : ""}day`}
                onClick={() => setSelectedDay(index)}
              >
                {index}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="time-table-content">
        <div className="day-hours">
          {[...Array(24)].map((_, index) => (
            <p className="hours">{index}</p>
          ))}
        </div>
        <div className="task-time">
          {todos.map((data, index) => (
            <Task
              key={index}
              text={data.text}
              id={data.id}
              timeStart={data.time_start}
              timeToEnd={data.time_to_finish}
              setTodos={setTodos}
              user={user}
            ></Task>
          ))}
        </div>
      </div>

      {isModalOpen ? (
        <ModalCreateToDo
          setNewToDo={setNewToDo}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
