import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../components/DataTable";
import DetailCard from "../components/DetailCard";

import {
  ProductDataFields,
  ProductDataTableColumns,
} from "../data/ProductData";

import { OrderDataFields, OrderDataTableColumns } from "../data/OrderData";
import { Spinner } from "react-bootstrap";

export default function Home({ user, loggedIn }) {
  const [users, setUsers] = useState();
  const [products, setProducts] = useState();
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersReq = axios.get("users");
    const productsReq = axios.get("product");
    const ordersReq = axios.get("order");

    axios
      .all([usersReq, productsReq, ordersReq])
      .then(
        axios.spread((...res) => {
          setUsers(res[0].data.user);
          setProducts(res[1].data.product.reverse());
          setOrders(res[2].data.order.reverse());
          setLoading(false);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return !user ? (
    <div className="my-5">
      <Spinner animation="grow" />
    </div>
  ) : (
    <div>
      <h4>Welcome, {user.firstname}!</h4>
      <div className="mt-3">
        <p className="my-4">Details at a glance:</p>
        {loading && !users && !products && !orders ? (
          <div className="my-5">
            <Spinner animation="grow" />
          </div>
        ) : (
          <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start">
            {!users ? (
              <div className="my-5">
                <Spinner animation="grow" />
              </div>
            ) : (
              <DetailCard
                title="No. of Users"
                count={users.length}
                time={users.at(-1)}
                path="users"
              />
            )}
            {!products ? (
              <div className="my-5">
                <Spinner animation="grow" />
              </div>
            ) : (
              <DetailCard
                title="No. of Listed Products"
                count={products.length}
                time={products.at(-1)}
                path="products"
              />
            )}
            {!orders ? (
              <div className="my-5">
                <Spinner animation="grow" />
              </div>
            ) : (
              <DetailCard
                title="No. of Orders"
                count={orders.length}
                time={orders.at(-1)}
                path="orders"
              />
            )}
          </div>
        )}
        {loading && !products ? (
          <div className="my-5">
            <Spinner animation="grow" />
          </div>
        ) : (
          <div className="my-5">
            <div className="d-flex justify-content-between mb-2">
              <h4>Recently listed products:</h4>
              {/* <Button size="sm" variant="outline-primary">
                List New Product
              </Button> */}
            </div>
            <DataTable
              tableColumns={ProductDataTableColumns}
              data={products.slice(0, 5)}
              dataFields={ProductDataFields}
            />
          </div>
        )}
        {loading && !orders ? (
          <div className="my-5">
            <Spinner animation="grow" />
          </div>
        ) : (
          <div className="my-5">
            <div className="d-flex justify-content-between mb-2">
              <h4>Recently listed orders:</h4>
              {/* <Button size="sm" variant="outline-primary">
                Add New Order
              </Button> */}
            </div>
            <DataTable
              tableColumns={OrderDataTableColumns}
              data={orders.slice(0, 5)}
              dataFields={OrderDataFields}
              type="orders"
            />
          </div>
        )}
      </div>
    </div>
  );
}
