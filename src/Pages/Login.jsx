import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Login({ loggedIn, setLoggedIn, setUserId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    axios
      .post("users/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userID", res.data.user.id);
        setUserId(res.data.user.id);
        setLoggedIn(true);
      })
      .catch((err) => {
        alert("Wrong username or password entered.");
        console.log(err);
      });
  };

  return (
    <div className="login-root row">
      {loggedIn && <Navigate to="/dashboard" replace={true} />}
      <h4 className="display-3 py-5 login-text">
        Welcome to FarmEazy Admin Portal
      </h4>
      <div className="mt-0 col-md-4 login-form">
        <h4 className="display-7 pb-5">Please Login to Continue</h4>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
