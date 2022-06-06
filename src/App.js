import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import NavbarComponent from "./components/NavbarComponent";
import axios from "axios";
import Product from "./Pages/Product";
import ProductEdit from "./Pages/ProductEdit";
import Order from "./Pages/Order";
import OrderEdit from "./Pages/OrderEdit";

function App() {
  const [user, setUser] = useState();
  const [userID, setUserId] = useState(localStorage.getItem("userID") || null);
  const [loggedIn, setLoggedIn] = useState(false);

  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (userID) {
      axios
        .get(`users/${userID}`)
        .then((res) => {
          setUser(res.data.user[0]);
          setLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
  }, [userID]);

  return (
    <div className="root">
      <NavbarComponent
        user={user}
        handleLogout={handleLogout}
        loggedIn={loggedIn}
      />
      <div className="container my-4">
        <Routes>
          <Route path="/order">
            <Route path=":id" element={<Order />} />
            <Route path="edit/:id" element={<OrderEdit />} />
          </Route>

          <Route path="/product">
            <Route path=":id" element={<Product />} />
            <Route path="edit/:id" element={<ProductEdit />} />
          </Route>

          <Route
            path="/dashboard"
            element={<Home user={user} loggedIn={loggedIn} />}
          />
          <Route
            index
            element={<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
