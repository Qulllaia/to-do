import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../css/ToDos.css";
import ModalCreateToDo from "../components/ModalCreateToDo";
import Task from "../components/Task";

export const ToDos = () => {
  const user = useSelector((store) => store.user);
  const [todos, setTodos] = useState([]);
  const [newToDo, setNewToDo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState();

  useEffect(() => {
    getUserDataAPI().then((res) => setTodos([...res]));
    console.log(typeof todos);
  }, [user]);

  useEffect(() => {
    if (newToDo !== null) {
      newToDo.user_id = user.id;
      fetch("http://localhost:8000/api/create_todo", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newToDo),
      }).then((res) => {
        console.log(res);
        getUserDataAPI().then((res) => setTodos([...res]));
      });
    }
  }, [newToDo]);

  const getUserDataAPI = async () => {
    const fetchResult = await fetch("http://localhost:8000/api/user_todo", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => data);
    if (fetchResult.length === 0) {
      return [];
    } else {
      return [...fetchResult];
    }
  };

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
          <p className="month">Месяц</p>
          <div className="days">
            {[...Array(31)].map((_, index) => (
              <div className="day">{index}</div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="day-hours">
          {[...Array(24)].map((_, index) => (
            <>
              <p className="hours">{index}</p>
              <hr className="separete-line"></hr>
            </>
          ))}
        </div>
        {todos.map((data, index) => (
          <Task
            key={index}
            text={data.text}
            id={data.id}
            timeStart={data.time_start}
            timeToEnd={data.time_to_finish}
            setTodos={setTodos}
            getUserDataAPI={getUserDataAPI}
          ></Task>
        ))}
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
