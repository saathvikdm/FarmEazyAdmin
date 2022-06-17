import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function ProductEdit() {
  let navigate = useNavigate();

  let { id } = useParams();

  const [product, setProduct] = useState();

  useEffect(() => {
    const productsReq = axios.get(`product/${id}`);

    productsReq
      .then((res) => {
        setProduct(res.data.product[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

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

    const data = new FormData();
    for (let key in product) {
      data.append(key, product[key]);
    }

    for (var pair of data.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    // axios
    //   .put(`product/${id}`, data)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));
    // navigate(`/products/${id}`, { replace: true });
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
            &gt;{" "}
            <Link to={`/products/${id}`} style={{ textDecoration: "none" }}>
              Product Details
            </Link>{" "}
            &gt; Product Edit Page
          </p>
          <h3>ID: {id}</h3>
          {product && (
            <>
              <p>
                Type: <b>{product.type}</b>
                <br />
                Seller name:{" "}
                <b>
                  {product.User.firstname} {product.User.lastname}
                </b>
                <br />
                Seller Address: <b>{product.User.address}</b>
              </p>
            </>
          )}
        </div>
      </div>
      {!product ? (
        <div className="my-5">
          <Spinner animation="grow" />
        </div>
      ) : (
        <div className="w-50">
          <Form onSubmit={handleSave} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                name="name"
                value={product.name}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter product name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                Available quantity in{" "}
                {product.type === "Rent" ? `in Hr(s)` : `in KG`}
              </Form.Label>
              <Form.Control
                name="avl_qty"
                value={product.avl_qty}
                onChange={handleInputChange}
                type="number"
                placeholder="Enter available Quantity"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                Minimum purchase quantity in{" "}
                {product.type === "Rent" ? `in Hr(s)` : `in KG`}
              </Form.Label>
              <Form.Control
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
                type="number"
                placeholder="Enter Price (in ₹)"
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Product Image (ignore to retain image)</Form.Label>
              <Form.Control
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
                  to={`/products/${id}`}
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
