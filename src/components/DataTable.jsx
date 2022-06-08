import React from "react";
import { Button, Table } from "react-bootstrap";
import _ from "lodash";
import FlattenObject from "../util/FlattenObject";
import { Link } from "react-router-dom";

export default function DataTable({
  data,
  tableColumns,
  dataFields,
  type = "product",
}) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {tableColumns.map((i, idx) => (
            <th>{i}</th>
          ))}
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        {data.map((i, idx) => {
          let dataFieldSubset = _.pick(FlattenObject(i), dataFields);
          return (
            <tr>
              <td>{idx + 1}</td>
              {Object.keys(dataFieldSubset).map((k, i) => (
                <td>{String(dataFieldSubset[k])}</td>
              ))}
              <td>
                <Button size="sm" variant="outline-secondary">
                  <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to={`/${type}/${i.id}`}
                  >
                    Details
                  </Link>
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
