import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataTable from "../components/DataTable";
import { OrderDataFields, OrderDataTableColumns } from "../data/OrderData";

export default function Orders() {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);

  const [filtered, setfiltered] = useState();

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("order")
      .then((res) => {
        setOrders(res.data.order.reverse());
        setfiltered(res.data.order.reverse());
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (searchQuery !== "" && searchQuery.length > 0) {
      if (filtered && filtered.length > 0) {
        const prodArr = Array.from(filtered);
        const filteredArr = prodArr.filter((item) =>
          item.Product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setOrders(filteredArr);
      }
    } else {
      fetchData();
    }
  }, [searchQuery]);

  useEffect(() => {
    if (filter == 0) {
      fetchData();
    }
    if (filtered && filtered.length > 0) {
      const prodArr = Array.from(filtered);
      const filteredArr = prodArr.filter((item) => item.Product.type == filter);
      setOrders(filteredArr);
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
            &gt; Orders
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <h4>Orders placed on FarmEazy marketplace:</h4>
        <Button size="sm" variant="outline-primary">
          <Link
            to="/orders/add"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            List New Order
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
          tableColumns={OrderDataTableColumns}
          data={orders}
          dataFields={OrderDataFields}
          type="orders"
        />
      )}
    </div>
  );
}
