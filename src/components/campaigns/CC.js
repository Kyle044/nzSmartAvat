import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StopNav from "../sidebar/StopNav";
import HelpWindow from "../sidebar/helpWindow";
import Stack from "react-bootstrap/Stack";
import Legends from "../sidebar/Legends";
import IntroCard from "../cards/introCard";
import FillersCard from "../cards/fillersCard";
import RebuttalsCard from "../cards/rebuttalsCard";
import {
  introduction,
  rebuttals,
  fillers
} from "../../uploadedRecordings/dataCC";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { startActions } from "../../store/start-slice";
function CC() {
  const dispatch = useDispatch();
  const [cc, setCC] = useState({
    introduction: [],
    rebuttals: [],
    fillers: []
  });
  let navigate = useNavigate();
  const start = useSelector((state) => state.start.start);
  const [step, setStep] = useState(0);
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    if (start == 0) {
      navigate("/");
    } else {
      setCC({
        introduction: introduction,
        rebuttals: rebuttals,
        fillers: fillers
      });
    }
  }, []);

  const btnClicked = useSelector((state) => state.call.buttonClicked);
  const call = useSelector((state) => state.start);
  const finish = () => {
    setStep(0);
    var endCall = Date.now();
    var startCall = call.start;
    var callTime = new Date(endCall) - new Date(startCall);
    var minutehehe = (callTime / (1000 * 60)) % 60;

    var newItem = {
      TimeSpent: Math.ceil(minutehehe),
      ...call,
      end: endCall,
      log: btnClicked
    };
    var oldItems = JSON.parse(localStorage.getItem("callArray")) || [];
    oldItems.push(newItem);
    localStorage.setItem("callArray", JSON.stringify(oldItems));
    navigate("/");
  };
  const handleKeyPress = (event) => {
    if (event.key === "Space") {
      console.log("space press here! ");
    }
  };
  return (
    <Container
      fluid
      style={{ padding: "1rem", height: "100vh" }}
      onKeyPress={handleKeyPress}
    >
      <Row>
        <Col lg={3}>
          <Stack gap={3}>
            <StopNav />
            <HelpWindow campaign="CC" />
            <Legends />
          </Stack>
        </Col>
        <Col lg={9}>
          {step === 0 ? (
            <h6 className="heder">INTRODUCTION</h6>
          ) : step === 1 ? (
            <h6 className="heder">MANDATORY OPT IN</h6>
          ) : step === 2 ? (
            <h6 className="heder">VERIFICATION OF INFORMATION</h6>
          ) : step === 3 ? (
            <h6 className="heder">DEMOGRAPHIC QUESTIONS</h6>
          ) : step === 4 ? (
            <h6 className="heder">CHARITY QUESTIONS</h6>
          ) : null}
          <Stack gap={3}>
            <IntroCard recording={cc.introduction[step]} />
            <FillersCard recording={cc.fillers[step]} />
            <RebuttalsCard recording={cc.rebuttals[step]} />

            <div className="row mb-2">
              {step == 0 ? null : (
                <div className="col center ">
                  <button
                    className="btn btn-success w-100"
                    onClick={() => {
                      prevStep();
                    }}
                  >
                    Previous Step
                  </button>
                </div>
              )}

              {step <= 3 ? (
                <div className="col center">
                  <button
                    className="btn btn-success w-100"
                    onClick={() => {
                      nextStep();
                    }}
                  >
                    Next Step
                  </button>
                </div>
              ) : (
                <div className="col center">
                  <button
                    className="btn btn-success w-100"
                    onClick={() => {
                      finish();
                    }}
                  >
                    Finish
                  </button>
                </div>
              )}
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default CC;
