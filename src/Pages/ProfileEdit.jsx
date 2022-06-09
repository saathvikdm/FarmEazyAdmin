import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function ProfileEdit({ user: userProp }) {
  let navigate = useNavigate();

  const [user, setUser] = useState(userProp);

  console.log(userProp);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleFileSelect = (e) => {
    console.log(e.target.files[0]);
    setUser({
      ...user,
      user_image: e.target.files[0],
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in user) {
      data.append(key, user[key]);
    }

    axios
      .put(`users/${user.id}`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    navigate(`/profile`, { replace: true });
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
            <Link to={`/profile`} style={{ textDecoration: "none" }}>
              Profile
            </Link>{" "}
            &gt; Profile Edit Page
          </p>
          <h3>ID: {user.id}</h3>
        </div>
      </div>
      {!userProp && !user ? (
        <div className="my-5">
          <Spinner animation="grow" />
        </div>
      ) : (
        <div className="w-50">
          <Form onSubmit={handleSave} encType="multipart/form-data">
            <Form.Group className="mb-3">
              <Form.Label>Firstname</Form.Label>
              <Form.Control
                name="firstname"
                value={user.firstname}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter Firstname"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Lastname</Form.Label>
              <Form.Control
                name="lastname"
                value={user.lastname}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter Lastname"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                name="email"
                value={user.email}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter Email Address"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                value={user.address}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter Address"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                type="number"
                placeholder="Enter Phone number"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                value={user.city}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter City"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                User Profile Image (ignore to retain image)
              </Form.Label>
              <Form.Control
                type="file"
                placeholder="Enter image address"
                name="image"
                // value={product.image}
                onChange={handleFileSelect}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>User Type</Form.Label>
              <Form.Select
                name="UserTypeId"
                value={user.UserTypeId}
                onChange={handleInputChange}
              >
                <option value={null}>Select User</option>
                <option value={1}>Farmer</option>
                <option value={2}>User</option>
                <option value={3}>Renter</option>
                <option value={4}>Admin</option>
                <option value={5}>Manufacturer</option>
              </Form.Select>
            </Form.Group>
            <div className="my-3">
              <Button
                className="me-2"
                size="sm"
                variant="outline-success"
                // onClick={(e) => handleSave(e)}
                type="submit"
              >
                Save Changes
              </Button>
              <Button className="me-2" size="sm" variant="outline-danger">
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                  to={"/profile"}
                >
                  Go back
                </Link>
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
