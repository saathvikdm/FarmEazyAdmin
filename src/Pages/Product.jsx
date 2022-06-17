import axios from "axios";
import { Button, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function Product() {
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

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`product/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    navigate("/products", { replace: true });
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
            &gt; Product Details
          </p>
          <h3>ID: {id}</h3>
          {product && (
            <p>
              Type: <b>{product.type}</b>
            </p>
          )}
          <div className="mt-3">
            <Button className="me-2" size="sm" variant="outline-secondary">
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to={`/products/edit/${id}`}
              >
                Edit product
              </Link>
            </Button>
            <Button
              className="me-2"
              size="sm"
              variant="outline-danger"
              onClick={(e) => handleDelete(e)}
            >
              Delete product
            </Button>
          </div>
        </div>
      </div>
      {!product ? (
        <div className="my-5">
          <Spinner animation="grow" />
        </div>
      ) : (
        <div className="d-flex mt-3">
          <div className="col-md-6">
            <p>
              Product Name: <b>{product.name}</b>
            </p>
            <p>
              Seller name:{" "}
              <b>
                {product.User.firstname} {product.User.lastname}
              </b>
            </p>
            <p>
              Seller Address: <b>{product.User.address}</b>
            </p>
            <p>
              Available quantity:{" "}
              <b>
                {product.type === "Rent"
                  ? `${product.avl_qty} Hrs`
                  : `${product.avl_qty} KG`}
              </b>
            </p>
            <p>
              Minimum purchase quantity:{" "}
              <b>
                {product.type === "Rent"
                  ? `${product.min_qty} Hrs`
                  : `${product.min_qty} KG`}
              </b>
            </p>
            <p>
              Price: <b>₹{product.price}</b>
            </p>
            <p>
              Product listed on: <b>{product.createdAt}</b>
            </p>
            <p>
              Product updated on: <b>{product.updatedAt}</b>
            </p>
          </div>
          {product.image ? (
            <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
              <p>Product Image</p>
              <img
                src={product.image}
                width="50%"
                height="auto"
                alt="product_image"
              />
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
