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
import { ExportToCsv } from "export-to-csv";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import _ from "lodash";
function Log() {
  let dispatch = useDispatch();
  const [cmp, setCmp] = useState("CC");
  const [state, setState] = useState();
  const btnClicked = useSelector((state) => state.call.buttonClicked);
  let navigate = useNavigate();
  const call = useSelector((state) => state.start);

  useEffect(() => {
    var oldItems = JSON.parse(localStorage.getItem("callArray")) || [];
    setState(oldItems);
  }, []);

  useEffect(() => {
    $("#table_id").DataTable();

    if (state) {
      calculateReportSummary();
    }
  }, [state]);

  const exportCSV = () => {
    if (state.length) {
      const options = {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        showLabels: true,
        showTitle: true,
        title: "CALL OVERALL REPORT : " + moment(Date.now()).format("lll"),
        useTextFile: false,
        filename: "CALL REPORT DATE => " + moment(Date.now()).format("lll"),
        useBom: true,
        useKeysAsHeaders: true
      };
      const csvExporter = new ExportToCsv(options);

      const filteredData = state.map((c) => {
        c.start = moment(c.start).format("LT");
        c.end = moment(c.end).format("LT");
        c.campaign = c.campaign.substr(1);
        c.log = JSON.stringify(
          c.log.map((l) => {
            return l.name;
          })
        );

        return c;
      });
      csvExporter.generateCsv(filteredData);
      window.location.reload();
    } else {
      alert("There is no call log available to export");
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [reportSummary, setReportSummary] = useState({
    callsMade: 0,
    aveTimeCall: 0,
    topButtons: []
  });
  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }
  const calculateReportSummary = () => {
    if (state) {
      // Setting the calls made
      var callsMadez = state.length;
      setReportSummary((prev) => {
        return { ...prev, callsMade: callsMadez };
      });
      // Calculating the top 10 used buttons
      var stateOverallLogs = state.map((st, i) => {
        var arr = [];

        return arr.concat(st.log);
      });
      var filteredOverallLogs = stateOverallLogs.flat().map((sol) => {
        return sol.name;
      });
      var obj = _.countBy(filteredOverallLogs);
      // create an array
      var arr = [];

      // loop through the object and add values to the array
      for (var p in obj) {
        arr.push(obj[p]);
      }

      // sort the array, largest numbers to lowest
      arr.sort(function (a, b) {
        return b - a;
      });

      // grab the first 10 numbers
      var firstTen = arr.slice(0, 5);
      var myTop10 = [];
      firstTen.forEach((ft) => {
        myTop10.push(getKeyByValue(obj, ft));
      });

      if (myTop10) {
        setReportSummary((prev) => {
          return { ...prev, topButtons: myTop10 };
        });
      }

      // Average time spent :

      var stateOverallTime = state.map((st, i) => {
        var arr = [];
        return arr.concat(st.TimeSpent);
      });

      setReportSummary((prev) => {
        return { ...prev, aveTimeCall: _.mean(stateOverallTime.flat()) };
      });
    } else {
      return false;
    }
  };

  return (
    <div>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/nz_avat">SMART AVATAR NZ</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex">
              <NavDropdown
                title="CAMPAIGN"
                id="basic-nav-dropdown"
                onSelect={(val) => {
                  setCmp(val);
                }}
              >
                <NavDropdown.Item eventKey="CC">CC</NavDropdown.Item>
                <NavDropdown.Item eventKey="CP"> CP</NavDropdown.Item>
                <NavDropdown.Item eventKey="MCS">MCS</NavDropdown.Item>
                <NavDropdown.Item eventKey="all">ALL</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                onClick={() => {
                  handleShow();
                }}
              >
                Report Summary
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to clear the report log?"
                    )
                  ) {
                    localStorage.clear();
                    window.location.reload();
                  } else {
                    // Do nothing!
                  }
                }}
              >
                Clear Report Data
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <Alert variant="success" className="mt-3">
          <Alert.Heading>Hey, nice to see you</Alert.Heading>
          <p>This is where we can review the call logs and export reports</p>
          <hr />
          <p className="mb-0">Selected Campaign : {cmp}</p>
        </Alert>

        {state ? (
          <table id="table_id" className="display">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Time Spent</th>
                <th>Start Call</th>
                <th>End Call</th>
                <th>Recording Clicked</th>
                <th className="invisible position-absolute">
                  Recording Clicked Hidden
                </th>
              </tr>
            </thead>
            <tbody>
              {state.map((call) => {
                return call.campaign.substr(1) == cmp ? (
                  <tr key={call.start}>
                    <td>{call.campaign.substr(1)}</td>
                    <td>{call.TimeSpent} Minutes</td>
                    <td>{moment(call.start).format("LTS")}</td>
                    <td>{moment(call.end).format("LTS")}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          navigate("/ButtonHistory", {
                            state: { log: call.log }
                          });
                        }}
                      >
                        View
                      </button>
                    </td>
                    <td className="invisible position-absolute">
                      {call.log && (
                        <table>
                          <thead>
                            <th>Button Name</th>
                            <th>Button Type</th>
                          </thead>
                          <tbody>
                            {call.log.map((btnClick) => {
                              <tr key={btnClick.index}>
                                <td>{btnClick.name}</td>
                                <td>{btnClick.type}</td>
                              </tr>;
                            })}
                          </tbody>
                        </table>
                      )}
                    </td>
                  </tr>
                ) : cmp == "all" ? (
                  <tr key={call.start}>
                    <td>{call.campaign.substr(1)}</td>
                    <td>{call.TimeSpent} Minutes</td>
                    <td>{moment(call.start).format("LTS")}</td>
                    <td>{moment(call.end).format("LTS")}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          navigate("/ButtonHistory", {
                            state: { log: call.log }
                          });
                        }}
                      >
                        View
                      </button>
                    </td>
                    <td className="invisible position-absolute">
                      {call.log && (
                        <table>
                          <thead>
                            <th>Button Name</th>
                            <th>Button Type</th>
                          </thead>
                          <tbody>
                            {call.log.map((btnClick) => {
                              <tr key={btnClick.index}>
                                <td>{btnClick.name}</td>
                                <td>{btnClick.type}</td>
                              </tr>;
                            })}
                          </tbody>
                        </table>
                      )}
                    </td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>
        ) : null}
      </Container>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-80w">
        <Modal.Body>
          <Card>
            <Card.Header>
              <h6>Report Summary as of : {moment(Date.now()).format("lll")}</h6>
            </Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-6">
                  <h6>Total Calls Made : {reportSummary.callsMade} </h6>
                  <h6>
                    Average Time Per Call :
                    {reportSummary.aveTimeCall
                      ? Math.ceil(reportSummary.aveTimeCall)
                      : 0}
                  </h6>
                </div>
                <div className="col-6">
                  <h6>Top 5 Frequently Used Buttons</h6>
                  <ul>
                    {reportSummary.topButtons.map((tb, i) => {
                      return <li key={i}>{tb}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={exportCSV}>
            Export Report
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Log;
