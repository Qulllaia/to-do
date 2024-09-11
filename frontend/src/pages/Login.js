import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export const Login = () =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const submitEvent = async (e) =>{
      e.preventDefault()
      fetch("http://localhost:8000/api/login",{method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        
          body: JSON.stringify({
              email,
              password
          })
        }).then((res)=>console.log(res)).finally(()=>{
          navigate('/')  
        })
  }
    return(
        <form className="callout text-center" onSubmit={submitEvent}>
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

          <div class="form-floating">
            <input type="email" class="form-control" onChange={(e)=>setEmail(e.target.value)}/>
            <label>Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" onChange={(e)=>setPassword(e.target.value)}/>
            <label>Password</label>
          </div>

          <div class="form-check text-start my-3">
            <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
            <label class="form-check-label" for="flexCheckDefault">
              Remember me
            </label>
          </div>
          <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </form>

    )
}