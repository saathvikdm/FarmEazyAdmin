import React from "react";
import { Button, Table } from "react-bootstrap";
import _ from "lodash";
import FlattenObject from "../util/FlattenObject";

export default function DataTable({ data, tableColumns, dataFields }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {tableColumns.map((i, idx) => (
            <th key={idx}>{i}</th>
          ))}
          <th>Edit</th>
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
                  Edit
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
