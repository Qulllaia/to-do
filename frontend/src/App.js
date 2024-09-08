import React, {useEffect, useState} from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8081/api')
    .then(res => res.json())
    .then(data=>setData(data))
    .catch(e=>console.log(e))
    
  }, []);
  return (
    <div className="App">
      {data ? <h1> {data.message} </h1> : <h1>Loading</h1>}
    </div>
  );
}

export default App;
