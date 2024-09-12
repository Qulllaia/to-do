import React from "react";
import { Outlet } from "react-router-dom";
import './css/App.css'
import { Nav } from "./components/Nav";

function App(props) { 
  
  return (
    <div className="App">
      <Nav/>
      <main className="form-signin w-100 m-auto">
        {props.children}
        <Outlet/>
      </main>
    </div>
  );
}

export default App;
