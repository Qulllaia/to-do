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
      // console.log(fetchResult);
      return [];
    } else {
      // console.log(fetchResult);
      return [...fetchResult];
    }
  };

  return (
    <div className="todo-list">
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => setIsModalOpen(true)}
      >
        Add ToDo
      </button>

      {todos.map((data, index) => (
        <Task
          key={index}
          text={data.text}
          id={data.id}
          setTodos={setTodos}
          getUserDataAPI={getUserDataAPI}
        ></Task>
      ))}

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
