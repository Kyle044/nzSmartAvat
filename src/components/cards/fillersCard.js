import React from "react";
import Card from "react-bootstrap/Card";
import FillerBtn from "../buttons/fillerBtn";
function fillersCard({ recording }) {
  return (
    <Card>
      <Card.Header>Fillers</Card.Header>
      <Card.Body>
        {recording
          ? recording.map((rec) => {
              return <FillerBtn key={rec.src} name={rec.name} src={rec.src} />;
            })
          : null}
      </Card.Body>
    </Card>
  );
}

export default fillersCard;
