import React, {useEffect, useState} from "react";

function App() {
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
        <h1>Введите ID пользователя</h1>
        <form onSubmit={submitHandlerUserID}>
            <input name="userID" placeholder="Добавьте дело" type="number"></input>
            <button type="submit">Добавить дело</button>
        </form>

      {userID > 0 ? 
        <>
          <h1>Добавить дела для пользователя с id 2:</h1>
          <form onSubmit={submitHandler}>
            <input name="todo" placeholder="Добавьте дело"></input>
            <button type="submit">Добавить дело</button>
          </form>
          <h1>Дела пользователя с id 2:</h1>
          {data.map((data,index)=>(
            <h2 key={index}>{data.text}</h2>
          ))}
        </>
        :
          <>
          </>
      }
    </div>
  );
}

export default App;
