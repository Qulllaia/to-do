import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./css/App.css";
import { Nav } from "./components/Nav";
import { useDispatch } from "react-redux";
import { addLogAction } from "./store/userReducer";
function App(props) {
  const [name, setName] = useState();

  const dispatch = useDispatch();

  const saveLogUser = (user) => {
    dispatch(addLogAction(user));
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const content = await response.json();

      setName(content.name);
      saveLogUser(content);
    })();
  });
  return (
    <div className="App">
      <Nav />
      <main className="form-signin w-100 ">
        {props.children}
        <Outlet />
      </main>
    </div>
  );
}

export default App;
