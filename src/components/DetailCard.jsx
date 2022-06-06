import React from "react";
import { Card } from "react-bootstrap";

export default function DetailCard({ title, count, time }) {
  const d = new Date(time.createdAt);
  let dateString = d.toDateString();

  return (
    <Card
      bg="light"
      key="light"
      text={"dark"}
      style={{ width: "18rem" }}
      className="mb-2 mx-2"
    >
      <Card.Header style={{ textAlign: "right" }}>{title}</Card.Header>
      <Card.Body>
        <Card.Title style={{ textAlign: "right", fontSize: 72 }}>
          {count}
        </Card.Title>
        {/* <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text> */}
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated {dateString}</small>
      </Card.Footer>
    </Card>
  );
}