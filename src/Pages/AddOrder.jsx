import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function AddOrder() {
  let navigate = useNavigate();

  let defaultValues = {
    price: undefined,
    qty: undefined,
    fullfilled: false,
    UserId: undefined,
    ProductId: undefined,
  };

  const [order, setOrder] = useState(defaultValues);
  const [users, setUsers] = useState();
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  const [maxQty, setMaxQty] = useState(undefined);
  const [price, setPrice] = useState(undefined);

  useEffect(() => {
    const usersReq = axios.get("users");
    const productsReq = axios.get("product");

    axios
      .all([usersReq, productsReq])
      .then(
        axios.spread((...res) => {
          setUsers(res[0].data.user);
          setProducts(res[1].data.product);
          setLoading(false);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setOrder({
      ...order,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    let [ProductId, price] = order.ProductId.split(",");

    order.ProductId = ProductId;
    order.price = price;

    axios
      .post(`order/create`, order)
      .then((res) => {
        navigate(`/orders/${res.data.order.id}`, { replace: true });
      })
      .catch((err) => console.log(err));
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
            &gt; List New Order
          </p>
        </div>
      </div>
      <h4>List new order to FarmEazy marketplace:</h4>
      <Form
        className="w-50 my-3"
        noValidate
        // validated={validated}
        onSubmit={handleSave}
        encType="multipart/form-data"
      >
        {loading ? (
          "loading..."
        ) : (
          <Form.Group className="mb-3">
            <Form.Label>Select Product to place order on</Form.Label>
            <Form.Select
              name="ProductId"
              value={order.ProductId}
              onChange={handleInputChange}
            >
              <option value={null}>Select Product</option>
              {products.map((p, idx) => (
                <option value={[p.id, p.price]} key={idx}>
                  {p.name} ({p.User.firstname} {p.User.lastname})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
        {loading ? (
          "loading..."
        ) : (
          <Form.Group className="mb-3">
            <Form.Label>Select buyer placing order on behalf</Form.Label>
            <Form.Select
              name="UserId"
              value={order.UserId}
              onChange={handleInputChange}
            >
              <option value={null}>Select product type</option>
              {users.map((user, idx) => (
                <option value={user.id} key={idx}>
                  {user.firstname} {user.lastname}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Enter order quantity in KG(s) {maxQty && `(Max: ${maxQty} KG)`}
          </Form.Label>
          <Form.Control
            required
            name="qty"
            value={order.qty}
            onChange={handleInputChange}
            type="number"
            placeholder="Enter order quantity in KG(s)"
          />
        </Form.Group>
        {price && (
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Buying Price/KG (in ₹)</Form.Label>
            <Form.Control
              disabled
              name="price"
              //   value={order.price}
              onChange={handleInputChange}
              type="number"
              placeholder="Buying Price/KG (in ₹)"
            />
          </Form.Group>
        )}
        <div className="my-3">
          <Button
            className="me-2"
            size="sm"
            variant="outline-success"
            // onClick={(e) => handleSave(e)}
            type="submit"
          >
            Save Changes
          </Button>
          <Button className="me-2" size="sm" variant="outline-danger">
            <Link
              style={{ color: "inherit", textDecoration: "none" }}
              to={`/orders`}
            >
              Go back
            </Link>
          </Button>
        </div>
      </Form>
    </div>
  );
}
