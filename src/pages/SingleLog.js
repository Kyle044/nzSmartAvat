import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "datatables.net";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.css";

function SingleLog() {
  const [state, setState] = useState();
  const location = useLocation();
  useEffect(() => {
    setState(location.state.log);
    console.table(location.state.log);
  });
  useEffect(() => {
    $("#table_id2").DataTable();
  }, [state]);
  return (
    <div>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/nz_avat">SMART AVATAR NZ</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>

      <Container className="mt-3">
        {state ? (
          <table id="table_id2" className="display">
            <thead>
              <tr>
                <th>Button Name</th>
                <th>Button Type</th>
              </tr>
            </thead>
            <tbody>
              {state.map((call) => {
                return (
                  <tr key={call.index}>
                    <td>{call.name}</td>
                    <td>{call.type}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </Container>
    </div>
  );
}

export default SingleLog;
