import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitEvent = async (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      if (res.status === 200) navigate("/");
    });
  };
  return (
    <form className="callout text-center" onSubmit={submitEvent}>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

      <div className="form-floating">
        <input
          type="email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Email address</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Password</label>
      </div>

      <div className="form-check text-start my-3">
        <input
          className="form-check-input"
          type="checkbox"
          value="remember-me"
        />
        <label className="form-check-label">Remember me</label>
      </div>
      <button className="btn btn-primary w-100 py-2" type="submit">
        Sign in
      </button>
    </form>
  );
};
