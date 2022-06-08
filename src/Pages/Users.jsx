import React from "react";
import { Link } from "react-router-dom";

export default function Users() {
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
    </div>
  );
}
