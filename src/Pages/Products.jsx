import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataTable from "../components/DataTable";
import {
  ProductDataFields,
  ProductDataTableColumns,
} from "../data/ProductData";

export default function Products() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("product")
      .then((res) => {
        setProducts(res.data.product.reverse());
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="d-flex">
        <div className="flex-column">
          <p>
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              Home
            </Link>{" "}
            &gt; Products
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <h4>Listed products on FarmEazy marketplace:</h4>
        <Button size="sm" variant="outline-primary">
          <Link
            to="/products/add"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Add New Product
          </Link>
        </Button>
      </div>
      {loading ? (
        <div className="my-5">
          <Spinner animation="grow" />
        </div>
      ) : (
        <DataTable
          tableColumns={ProductDataTableColumns}
          data={products}
          dataFields={ProductDataFields}
        />
      )}
    </div>
  );
}
