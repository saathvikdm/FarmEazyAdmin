import axios from "axios";
import { Button, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function User() {
  let navigate = useNavigate();

  let { id } = useParams();

  const [user, setUser] = useState();

  useEffect(() => {
    const userReq = axios.get(`users/${id}`);

    userReq
      .then((res) => {
        setUser(res.data.user[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`users/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    navigate("/users", { replace: true });
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
            <Link to={`/users`} style={{ textDecoration: "none" }}>
              Users
            </Link>{" "}
            &gt; User Detail
          </p>
          <div className="mt-3">
            <Button className="me-2" size="sm" variant="outline-secondary">
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to={`/users/edit/${id}`}
              >
                Edit User
              </Link>
            </Button>
            <Button
              className="me-2"
              size="sm"
              variant="outline-danger"
              onClick={(e) => handleDelete(e)}
            >
              Delete user
            </Button>
          </div>
        </div>
      </div>
      {!user ? (
        <div className="my-5">
          <Spinner animation="grow" />
        </div>
      ) : (
        <div className="d-flex mt-3">
          <div className="col-md-5">
            <h3>ID: {user.id}</h3>
            <p>
              Full Name:{" "}
              <b>
                {user.firstname} {user.lastname}
              </b>
            </p>
            <p>
              User Type: <b>{user.UserType.name}</b>
            </p>
            <p>
              Email: <b>{user.email}</b>
            </p>
            <p>
              Phone: <b>{user.phone}</b>
            </p>
            <p>
              Address: <b>{user.address}</b>
            </p>
            <p>
              City: <b>{user.city}</b>
            </p>
          </div>
          {user.user_image ? (
            <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
              <p>User Profile Image</p>

              <img
                src={user.user_image}
                width="50%"
                height="auto"
                alt="user_image"
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
