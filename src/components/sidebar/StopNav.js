import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate, useLocation } from "react-router-dom";
function StopNav() {
  const location = useLocation();
  let navigate = useNavigate();
  const handleChange = (e) => {
    const { value } = e.target;
    if (value == "CC") {
      navigate("/CC");
    } else if (value == "CP") {
      navigate("/CP");
    } else if (value == "MCS") {
      navigate("/MCS");
    }
  };
  useEffect(() => {
    console.log();
  }, []);
  return (
    <Card>
      <Card.Header>Action</Card.Header>
      <Card.Body>
        <button className="btn btn-danger globalBtn">Stop Audio</button>
        {/* <InputGroup className="mt-2" size="sm">
          <InputGroup.Text className="fw-bold ">Campaign</InputGroup.Text>
          <Form.Select
            aria-label="Default select example"
            size="sm"
            onChange={handleChange}
          >
            {location.pathname == "/" ? (
              <>
                <option value="CC">CC</option>
                <option value="CP">CP</option>
                <option value="MCS">MCS</option>
              </>
            ) : location.pathname == "/CP" ? (
              <>
                <option value="CP">CP</option>
                <option value="CC">CC</option>
                <option value="MCS">MCS</option>
              </>
            ) : location.pathname == "/CC" ? (
              <>
                <option value="CC">CC</option>
                <option value="CP">CP</option>
                <option value="MCS">MCS</option>
              </>
            ) : location.pathname == "/MCS" ? (
              <>
                <option value="MCS">MCS</option>
                <option value="CC">CC</option>
                <option value="CP">CP</option>
              </>
            ) : null}
          </Form.Select>
        </InputGroup> */}
      </Card.Body>
    </Card>
  );
}

export default StopNav;
