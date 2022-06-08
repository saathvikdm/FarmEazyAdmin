import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function AddOrder() {
  let navigate = useNavigate();

  let defaultValues = {
    name: "",
    type: "",
    desc: "",
    image: undefined,
    price: undefined,
    min_qty: undefined,
    avl_qty: undefined,
    UserId: undefined,
  };

  const [users, setUsers] = useState();
  const [product, setProduct] = useState(defaultValues);
  const [loading, setLoading] = useState(true);
  //   const [validated, setValidated] = useState(false);

  let ProductTypes = ["Farm", "Consumable", "Rent"];

  useEffect(() => {
    axios
      .get("users")
      .then((res) => {
        setUsers(res.data.user);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleFileSelect = (e) => {
    console.log(e.target.files[0]);
    setProduct({
      ...product,
      image: e.target.files[0],
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // const form = e.currentTarget;
    // if (form.checkValidity() === false) {
    //   e.preventDefault();
    //   e.stopPropagation();
    // } else {
    //   setValidated(true);

    //   console.log(product);

    //   axios
    //     .post(`product/create`, product)
    //     .then((res) => {
    //       navigate(`/product/${res.data.product.id}`, { replace: true });
    //     })
    //     .catch((err) => console.log(err));
    // }

    const data = new FormData();
    for (let key in product) {
      data.append(key, product[key]);
    }

    axios
      .post(`product/create`, data)
      .then((res) => {
        navigate(`/product/${res.data.product.id}`, { replace: true });
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
            <Link to={`/products`} style={{ textDecoration: "none" }}>
              Products
            </Link>{" "}
            &gt; Add New Product
          </p>
        </div>
      </div>
      <h4>Add new product to FarmEazy marketplace:</h4>
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
            <Form.Label>Add product listing on behalf of user: </Form.Label>
            <Form.Select
              name="UserId"
              value={product.UserId}
              onChange={handleInputChange}
            >
              <option value={null}>Select User</option>
              {users.map((user, idx) => (
                <option value={user.id} key={idx}>
                  {user.firstname} {user.lastname}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            required
            name="name"
            value={product.name}
            onChange={handleInputChange}
            type="text"
            placeholder="Enter product name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Product Type </Form.Label>
          <Form.Select
            name="type"
            value={product.type}
            onChange={handleInputChange}
          >
            <option value={null}>Select product type</option>
            {ProductTypes.map((type, idx) => (
              <option value={type} key={idx}>
                {type}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Available quantity in KG(s)</Form.Label>
          <Form.Control
            required
            name="avl_qty"
            value={product.avl_qty}
            onChange={handleInputChange}
            type="number"
            placeholder="Enter available Quantity"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Minimum purchase quantity in KG(s)</Form.Label>
          <Form.Control
            required
            name="min_qty"
            value={product.min_qty}
            onChange={handleInputChange}
            type="number"
            placeholder="Enter minumum purchase Quantity"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price/KG (in ₹)</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter Price (in ₹)"
            name="price"
            value={product.price}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter brief description about the product"
            name="desc"
            value={product.desc}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            required
            type="file"
            placeholder="Enter image address"
            name="image"
            // value={product.image}
            onChange={handleFileSelect}
          />
        </Form.Group>
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
              to={`/products`}
            >
              Go back
            </Link>
          </Button>
        </div>
      </Form>
    </div>
  );
}
