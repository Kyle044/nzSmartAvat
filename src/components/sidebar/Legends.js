import React from "react";

import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { useSelector, useDispatch } from "react-redux";
function Legends() {
  const time = useSelector((state) => state.time);
  return (
    <Card>
      <Card.Header>Legends</Card.Header>
      <Card.Body>
        <Stack gap={3}>
          <div className="row">
            <div className="col-6 bg-danger"></div>
            <div className="col-6">
              <p className="navtitle">Closing / Stop Audio</p>
            </div>
          </div>
          <div className="row">
            <div className="col-6 bg-success"></div>
            <div className="col-6">
              <p className="navtitle">Navigation</p>
            </div>
          </div>
          <div className="row">
            <div className="col-2 bg-warning"></div>
            <div className="col-2 bg-dark"></div>
            <div className="col-2 bg-info"></div>
            <div className="col-6">
              <p className="navtitle">Recordings </p>
            </div>
          </div>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default Legends;
