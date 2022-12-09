import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { callActions } from "../../store/call-slice";
import { audioActions } from "../../store/audio-slice";
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

  const playAudio = (e) => {
    dispatch(audioActions.play(new Audio("/assets/resources/blank.wav")));
  };
  let dispatch = useDispatch();
  const btnClicked = useSelector((state) => state.call.buttonClicked);

  return (
    <Card>
      <Card.Header>Action</Card.Header>
      <Card.Body>
        <button
          className="btn btn-danger globalBtn fw-bold"
          onClick={() => {
            playAudio();
          }}
        >
          Stop Audio
        </button>
        <button
          className="btn btn-warning globalBtn mt-2 fw-bold"
          onClick={() => {
            playAudio();
          }}
        >
          Blank
        </button>
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
