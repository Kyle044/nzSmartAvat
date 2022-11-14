import React from "react";
import Card from "react-bootstrap/Card";

function helpWindow() {
  return (
    <Card>
      <Card.Header>Help Window</Card.Header>
      <Card.Body>
        <button className="btn btn-success globalBtn">Closing</button>
        <button className="btn btn-success globalBtn mt-2">Phonetics</button>
      </Card.Body>
    </Card>
  );
}

export default helpWindow;
