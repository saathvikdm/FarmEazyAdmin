import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataTable from "../components/DataTable";
import { UserDataFields, UserDataTableColumns } from "../data/UserData";

export default function Users() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  const [filtered, setfiltered] = useState();

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  console.log(users);

  const fetchData = () => {
    axios
      .get("users")
      .then((res) => {
        setUsers(res.data.user.reverse());
        setfiltered(res.data.user.reverse());
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (searchQuery !== "" && searchQuery.length > 0) {
      if (filtered && filtered.length > 0) {
        const prodArr = Array.from(filtered);
        const filteredArr = prodArr.filter(
          (item) =>
            item.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.lastname.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setUsers(filteredArr);
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
      const filteredArr = prodArr.filter((item) => item.UserTypeId == filter);
      setUsers(filteredArr);
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
            &gt; Users
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <h4>Registered Users on FarmEazy marketplace:</h4>
        <Button size="sm" variant="outline-primary">
          <Link
            to="/users/add"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Add New User
          </Link>
        </Button>
      </div>
      <div className="d-flex justify-content-end">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search user"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Select onChange={(e) => setFilter(e.target.value)}>
            <option value={0}>Sort by Type</option>
            <option value={4}>Admin</option>
            <option value={2}>User</option>
            <option value={1}>Farmer</option>
            <option value={3}>Renter</option>
            <option value={5}>Manufacturer</option>
          </Form.Select>
        </Form.Group>
      </div>
      {loading ? (
        <div className="my-5">
          <Spinner animation="grow" />
        </div>
      ) : (
        <DataTable
          tableColumns={UserDataTableColumns}
          data={users}
          dataFields={UserDataFields}
          type="users"
        />
      )}
    </div>
  );
}
