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
} from "../../uploadedRecordings/dataCP";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { startActions } from "../../store/start-slice";
function CP() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [cc, setCC] = useState({
    introduction: [],
    rebuttals: [],
    fillers: []
  });
  const [step, setStep] = useState(0);
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const btnClicked = useSelector((state) => state.call.buttonClicked);
  const call = useSelector((state) => state.start);

  const finish = () => {
    setStep(0);
    dispatch(startActions.end(Date.now()));
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
  useEffect(() => {
    console.log(introduction);
    setCC({
      introduction: introduction,
      rebuttals: rebuttals,
      fillers: fillers
    });
  }, []);

  return (
    <Container fluid style={{ padding: "1rem", height: "100vh" }}>
      <Row>
        <Col lg={3}>
          <Stack gap={3}>
            <StopNav />
            <HelpWindow campaign="CP" />
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
            <div className="row ">
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

export default CP;
