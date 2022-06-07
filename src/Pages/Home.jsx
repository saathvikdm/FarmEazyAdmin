import React, { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import DataTable from "../components/DataTable";
import DetailCard from "../components/DetailCard";
import { Button } from "react-bootstrap";

export default function Home({ user, loggedIn }) {
  const [users, setUsers] = useState();
  const [products, setProducts] = useState();
  const [orders, setOrders] = useState();

  let ProductDataTableColumns = [
    "#",
    "Name",
    "Listed By",
    "Type",
    "Price (in ₹)",
    "Min Qty (KG(s))",
    "Avl Qty (KG(s))",
  ];

  let ProductDataFields = [
    "name",
    "firstname",
    "type",
    "price",
    "min_qty",
    "avl_qty",
  ];

  let OrderDataTableColumns = [
    "#",
    "Product Name",
    "Seller Name",
    "Buyer Name",
    "Buying Price (in ₹)",
    "Qty (KG(s))",
    "Fullfilled?",
  ];

  let OrderDataFields = [
    "name",
    "sellerfname",
    "firstname",
    "price",
    "qty",
    "fullfilled",
  ];

  useEffect(() => {
    const usersReq = axios.get("users");
    const productsReq = axios.get("product");
    const ordersReq = axios.get("order");

    axios
      .all([usersReq, productsReq, ordersReq])
      .then(
        axios.spread((...res) => {
          setUsers(res[0].data.user);
          setProducts(res[1].data.product);
          setOrders(res[2].data.order);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return !user ? (
    "loading..."
  ) : (
    <div>
      <h4>Welcome, {user.firstname}!</h4>
      <div className="mt-3">
        <p className="my-4">Details at a glance:</p>
        {!users && !products && !orders ? (
          "loading..."
        ) : (
          <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start">
            <DetailCard
              title="No. of Users"
              count={users.length}
              time={users.at(-1)}
            />
            <DetailCard
              title="No. of Listed Products"
              count={products.length}
              time={products.at(-1)}
            />
            <DetailCard
              title="No. of Orders"
              count={orders.length}
              time={orders.at(-1)}
            />
          </div>
        )}
        {!products ? (
          "loading..."
        ) : (
          <div className="my-5">
            <div className="d-flex justify-content-between mb-2">
              <h4>Recently listed products:</h4>
              <Button size="sm" variant="outline-primary">
                List New Product
              </Button>
            </div>
            <DataTable
              tableColumns={ProductDataTableColumns}
              data={products}
              dataFields={ProductDataFields}
            />
          </div>
        )}
        {!orders ? (
          "loading..."
        ) : (
          <div className="my-5">
            <div className="d-flex justify-content-between mb-2">
              <h4>Recently listed orders:</h4>
              <Button size="sm" variant="outline-primary">
                Add New Order
              </Button>
            </div>
            <DataTable
              tableColumns={OrderDataTableColumns}
              data={orders}
              dataFields={OrderDataFields}
              type="order"
            />
          </div>
        )}
      </div>
    </div>
  );
}
