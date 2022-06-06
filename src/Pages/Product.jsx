import axios from "axios";
import { Button } from "react-bootstrap";
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
                to={`/product/edit/${id}`}
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
        "loading..."
      ) : (
        <div className="d-flex flex-column mt-3">
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
            Available quantity: <b>{product.avl_qty} KG(s)</b>
          </p>
          <p>
            Minimum purchase quantity: <b>{product.min_qty} KG(s)</b>
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
      )}
    </div>
  );
}
