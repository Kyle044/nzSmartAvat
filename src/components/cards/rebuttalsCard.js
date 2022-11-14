import React from "react";
import Card from "react-bootstrap/Card";
import RebuttalsBtn from "../buttons/rebuttalsBtn";
function rebuttalsCard({ recording }) {
  return (
    <Card>
      <Card.Header>Rebuttals</Card.Header>
      <Card.Body>
        {recording
          ? recording.map((rec) => {
              return (
                <RebuttalsBtn key={rec.src} name={rec.name} src={rec.src} />
              );
            })
          : null}
      </Card.Body>
    </Card>
  );
}

export default rebuttalsCard;
