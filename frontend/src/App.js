import React, {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
import './css/App.css'
import { Nav } from "./components/Nav";

function App(props) {
  const [userID, setUserID] = useState(0);
  const [data, setData] = useState([]);
  const [toDoData, setToDoData] = useState({});

  useEffect(() => {
    console.log(toDoData)
    if(userID > 0){
      fetch("http://localhost:8000/api/todo",{method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      
        body: JSON.stringify(toDoData)
      }).then(()=>getData())

    }

  }, [toDoData]);
  useEffect(() => {
    if(userID > 0){
      getData()
    }
  }, [userID]);

  const getData = () =>{
    fetch(`http://localhost:8000/api/todo?user_id=${userID}`)
      .then(res => res.json())
      .then(data=>setData(data))
      .catch(e=>console.log(e))
  }

  const submitHandler = (e) =>{
    e.preventDefault()
    // const formElement = 
    const form = new FormData(e.target)
    setToDoData({
      text: form.get('todo'),
      user_id: Number(userID)
    })
  }
  const submitHandlerUserID = (e) =>{
    e.preventDefault()
    // const formElement = 
    const form = new FormData(e.target)
    setUserID(form.get('userID'))
  }
  
  
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
