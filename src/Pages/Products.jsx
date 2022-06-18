import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataTable from "../components/DataTable";
import {
  ProductDataFields,
  ProductDataTableColumns,
} from "../data/ProductData";

export default function Products() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  const [filteredProducts, setFilteredProducts] = useState();

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState();

  const fetchData = () => {
    axios
      .get("product")
      .then((res) => {
        setProducts(res.data.product.reverse());
        setFilteredProducts(res.data.product.reverse());
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery !== "" && searchQuery.length > 0) {
      if (filteredProducts && filteredProducts.length > 0) {
        const prodArr = Array.from(filteredProducts);
        const filteredProductsArr = prodArr.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProducts(filteredProductsArr);
      }
    } else {
      fetchData();
    }
  }, [searchQuery]);

  useEffect(() => {
    if (filter == 0) {
      fetchData();
    }
    if (filteredProducts && filteredProducts.length > 0) {
      const prodArr = Array.from(filteredProducts);
      const filteredProductsArr = prodArr.filter((item) => item.type == filter);
      setProducts(filteredProductsArr);
    }
  }, [filter]);

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
      <div className="d-flex justify-content-end">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search product"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Select onChange={(e) => setFilter(e.target.value)}>
            <option value={0}>Sort by Type</option>
            <option value={"Farm"}>Farm</option>
            <option value={"Rent"}>Rent</option>
            <option value={"Consumable"}>Consumable</option>
          </Form.Select>
        </Form.Group>
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
