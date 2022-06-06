import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Order() {
  let navigate = useNavigate();

  let { id } = useParams();

  const [order, setOrder] = useState();

  useEffect(() => {
    const ordersReq = axios.get(`order/${id}`);

    ordersReq
      .then((res) => {
        setOrder(res.data.order[0]);
        console.log(order);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`order/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    navigate("/dashboard", { replace: true });
  };

  return (
    <div>
      <div className="d-flex">
        <div className="flex-column">
          <p>
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              Home
            </Link>{" "}
            &gt; Order Details
          </p>
          <h3>ID: {id}</h3>
          {order && (
            <p>
              Type: <b>{order.Product.type}</b>
            </p>
          )}
          <div className="mt-3">
            <Button className="me-2" size="sm" variant="outline-secondary">
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to={`/order/edit/${id}`}
              >
                Edit order
              </Link>
            </Button>
            <Button
              className="me-2"
              size="sm"
              variant="outline-danger"
              onClick={(e) => handleDelete(e)}
            >
              Delete order
            </Button>
          </div>
        </div>
      </div>
      {!order ? (
        "loading..."
      ) : (
        <div className="d-flex flex-column mt-3">
          <p>
            Product Name: <b>{order.Product.name}</b>
          </p>
          <p>
            Seller ID: <b>{order.Product.UserId}</b>
          </p>
          <p>
            Buyer Name:{" "}
            <b>
              {order.User.firstname} {order.User.lastname}
            </b>
          </p>
          <p>
            Buying price: <b>₹{order.price}</b>
          </p>
          <p>
            Purchased Quantity: <b>{order.qty} KG(s)</b>
          </p>
          <p>
            Total Order Value: <b>₹{order.qty * order.price}</b>
          </p>
          <p>
            Order Status:{" "}
            <b>{!order.fullfilled ? "In Process" : "Processed"}</b>
          </p>
          <p>
            Order created on: <b>{order.createdAt}</b>
          </p>
          <p>
            Order updated on: <b>{order.updatedAt}</b>
          </p>
        </div>
      )}
    </div>
  );
}
