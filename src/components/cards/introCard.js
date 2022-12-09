import React from "react";
import Card from "react-bootstrap/Card";
import IntroBtn from "../buttons/introBtn";
function introCard({ recording }) {
  return (
    <Card>
      <Card.Header>Main Recordings</Card.Header>
      <Card.Body>
        {recording
          ? recording.map((rec) => {
              return (
                <IntroBtn
                  key={rec.src}
                  name={rec.name}
                  src={rec.src}
                  script={rec.script}
                />
              );
            })
          : null}
      </Card.Body>
    </Card>
  );
}

export default introCard;
