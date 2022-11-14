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
import { introduction, rebuttals, fillers } from "../../data";
import { useNavigate, useLocation } from "react-router-dom";

function MCS() {
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

  const finish = () => {
    navigate("/");
    setStep(0);
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
            <HelpWindow />
            <Legends />
          </Stack>
        </Col>
        <Col lg={9}>
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

              {step <= 2 ? (
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

export default MCS;
