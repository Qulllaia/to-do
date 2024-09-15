import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrateUser } from "../server";
export const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitEvent = async (e) => {
    e.preventDefault();
    registrateUser(name, email, password).then(() => navigate("/login/"));
  };

  return (
    <form className="callout text-center" onSubmit={submitEvent}>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

      <div className="form-floating">
        <input
          className="form-control"
          placeholder="name@example.com"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>Login</label>
      </div>
      <div className="form-floating">
        <input
          type="email"
          className="form-control"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Email address</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Password</label>
      </div>

      <button className="btn btn-primary w-100 py-2" type="submit">
        Sign in
      </button>
    </form>
  );
};
