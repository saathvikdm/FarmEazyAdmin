import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

// axios.defaults.baseURL = "http://192.168.29.110:8080/api/";
// axios.defaults.baseURL = "http://localhost:8080/api/";
axios.defaults.baseURL = "https://api.farmeazy.tech/api/";
// axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
