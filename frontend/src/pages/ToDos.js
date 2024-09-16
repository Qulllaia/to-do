import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../css/ToDos.css";
import ModalCreateToDo from "../components/ModalCreateToDo";
import Task from "../components/Task";
import { postNewToDo, getUserDataAPI } from "../server";
import DateControllers from "../components/DateControllers";

export const ToDos = () => {
  const localDate = new Date().toLocaleDateString();
  const user = useSelector((store) => store.user);
  const [todos, setTodos] = useState([]);
  const [newToDo, setNewToDo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState();
  const [selectedDay, setSelectedDay] = useState(
    Number(localDate.split(".")[0])
  );
  const [monthNumber, setMonthNumber] = useState(
    Number(localDate.split(".")[1])
  );

  useEffect(() => {
    getUserDataAPI(
      user,
      `${
        selectedDay +
        "." +
        (monthNumber.toString().length >= 2 ? monthNumber : "0" + monthNumber) +
        "." +
        localDate.slice(6)
      }`
    ).then((res) => setTodos([...res]));
    console.log(todos);
  }, [user, selectedDay, monthNumber]);

  useEffect(() => {
    if (newToDo !== null) {
      postNewToDo(
        newToDo,
        user,
        `${
          selectedDay +
          "." +
          (monthNumber.toString().length >= 2
            ? monthNumber
            : "0" + monthNumber) +
          "." +
          localDate.slice(6)
        }`
      ).then((res) => setTodos([...res]));
    }
  }, [newToDo]);

  return (
    <div className="todo-list">
      <DateControllers
        setIsModalOpen={setIsModalOpen}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        monthNumber={monthNumber}
        setMonthNumber={setMonthNumber}
        localDate={localDate}
      />
      <div className="time-table-content">
        <div className="day-hours">
          {[...Array(24)].map((_, index) => (
            <p key={index} className="hours">
              {index}
            </p>
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
              toDos={todos}
              user={user}
              localDay={`${
                selectedDay +
                "." +
                (monthNumber.toString().length >= 2
                  ? monthNumber
                  : "0" + monthNumber) +
                "." +
                localDate.slice(6)
              }`}
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
