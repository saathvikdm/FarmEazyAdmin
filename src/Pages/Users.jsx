import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataTable from "../components/DataTable";
import { UserDataFields, UserDataTableColumns } from "../data/UserData";

export default function Users() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("users")
      .then((res) => {
        setUsers(res.data.user.reverse());
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
      {loading ? (
        "loading..."
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
