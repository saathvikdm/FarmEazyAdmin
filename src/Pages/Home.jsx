import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import DataTable from "../components/DataTable";
import DetailCard from "../components/DetailCard";

export default function Home({ user, loggedIn }) {
  const [users, setUsers] = useState();
  const [products, setProducts] = useState();
  const [orders, setOrders] = useState();

  let ProductDataTableColumns = [
    "#",
    "Name",
    "Type",
    "Price",
    "Min Qty",
    "Avl Qty",
    "Created At",
  ];

  let ProductDataFields = [
    "firstname",
    "type",
    "price",
    "min_qty",
    "avl_qty",
    "createdAt",
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

  return (
    user && (
      <div>
        <h4 className="my-4">Welcome, {user.firstname}!</h4>
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
              <h4>Recently listed products:</h4>
              <DataTable
                tableColumns={ProductDataTableColumns}
                data={products}
                dataFields={ProductDataFields}
              />
            </div>
          )}
        </div>
      </div>
    )
  );
}
