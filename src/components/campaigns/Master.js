import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useNavigate, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { startActions } from "../../store/start-slice";
function Master() {
  const [state, setState] = useState("/CC");
  const location = useLocation();
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { value } = e.target;
    if (value == "CC") {
      setState("/CC");
    } else if (value == "CP") {
      setState("/CP");
    } else if (value == "MCS") {
      setState("/MCS");
    }
  };

  const clickStart = () => {
    if (state) {
      navigate(state);
      dispatch(startActions.set(Date.now()));
      dispatch(startActions.setCampaign(state));
    } else {
      alert("Kindly select a campaign");
    }
  };

  const clickLog = () => {
    navigate("/Log");
  };
  const dispatch = useDispatch();

  return (
    <div className="masterDiv">
      <div className="subDiv">
        <h3
          className="strtBtn"
          onClick={() => {
            clickStart();
          }}
        >
          Start Call
        </h3>

        {/* <h4
          className="exportBtn mt-2"
          onClick={() => {
            clickLog();
          }}
        >
          Call Log
        </h4> */}
        <InputGroup className="mt-2" size="sm">
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
        </InputGroup>
      </div>
    </div>
  );
}

export default Master;
