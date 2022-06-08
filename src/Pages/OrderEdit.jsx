import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function OrderEdit() {
  let navigate = useNavigate();

  let { id } = useParams();

  const [order, setOrder] = useState();

  useEffect(() => {
    const orderReq = axios.get(`order/${id}`);

    orderReq
      .then((res) => {
        setOrder(res.data.order[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setOrder({
      ...order,
      [name]: value,
    });
  };

  const handleCheckInput = (e) => {
    const { checked } = e.target;
    setOrder({
      ...order,
      fullfilled: checked,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    axios
      .put(`order/${id}`, order)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    navigate(`/orders/${id}`, { replace: true });
  };

  return (
    <div>
      <div className="d-flex">
        <div className="flex-column">
          <p>
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              Home
            </Link>{" "}
            &gt;{" "}
            <Link to={`/orders`} style={{ textDecoration: "none" }}>
              Orders
            </Link>{" "}
            &gt;{" "}
            <Link to={`/orders/${id}`} style={{ textDecoration: "none" }}>
              Order Details
            </Link>{" "}
            &gt; Order Edit Page
          </p>
          <h3>ID: {id}</h3>
          {order && (
            <>
              <p>
                Product Name: <b>{order.Product.name}</b>
                <br />
                Type: <b>{order.Product.type}</b>
                <br />
                Seller ID: <b>{order.Product.UserId}</b>
                <br />
                Seller Name:{" "}
                <b>
                  {order.Product.User.sellerfname}{" "}
                  {order.Product.User.sellerlname}
                </b>
                <br />
                Price/KG: <b>₹{order.Product.price}</b>
                <br />
                Minimum Purchase Quantity: <b>{order.Product.min_qty} KG(s)</b>
              </p>
              <p>
                Buyer Name:{" "}
                <b>
                  {order.User.firstname} {order.User.lastname}
                </b>
              </p>
            </>
          )}
        </div>
      </div>
      {!order ? (
        "loading..."
      ) : (
        <div className="w-50">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Purchase Quantity in KG(s)</Form.Label>
              <Form.Control
                name="qty"
                value={order.qty}
                min={order.qty}
                onChange={handleInputChange}
                type="number"
                placeholder="Enter purchase Quantity in KG(s)"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Order Fullfilled?"
                value={order.fullfilled}
                name="fullfilled"
                onChange={handleCheckInput}
              />
            </Form.Group>
            <div className="my-3">
              <Button
                className="me-2"
                size="sm"
                variant="outline-success"
                onClick={(e) => handleSave(e)}
              >
                Save Changes
              </Button>
              <Button className="me-2" size="sm" variant="outline-danger">
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                  to={`/orders/${id}`}
                >
                  Go back
                </Link>
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
