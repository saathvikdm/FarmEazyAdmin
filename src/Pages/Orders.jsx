import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataTable from "../components/DataTable";
import { OrderDataFields, OrderDataTableColumns } from "../data/OrderData";

export default function Orders() {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("order")
      .then((res) => {
        setOrders(res.data.order.reverse());
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
      {loading ? (
        "loading..."
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
