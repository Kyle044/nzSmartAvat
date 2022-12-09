import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import StopNav from "./StopNav";
import FillerBtn from "../buttons/fillerBtn";
import Legends from "./Legends";
import { generalProbing } from "../../uploadedRecordings/generalProbing";
import { phonetics } from "../../uploadedRecordings/phonetics";
import { alphabets } from "../../uploadedRecordings/alphabets";
import { numbers } from "../../uploadedRecordings/numbers";
import {
  mandatoryClosingCC,
  mandatoryClosingCP,
  mandatoryClosingMCS
} from "../../uploadedRecordings/mandatoryClosing";
import "../../css/style.css";
function HelpWindow({ campaign }) {
  const [modal, setModal] = useState({
    generalProbing: false,
    phonetics: false,
    closing: false,
    cc: false,
    cp: false,
    mcs: false,
    alpha: false
  });

  const handleCloseClosing = () => {
    setModal((prev) => {
      return { ...prev, closing: false };
    });
  };

  const handleCloseProbing = () => {
    setModal((prev) => {
      return { ...prev, generalProbing: false };
    });
  };

  const handleClosePhonetics = () => {
    setModal((prev) => {
      return { ...prev, phonetics: false };
    });
  };

  const handleOpenClosing = () => {
    setModal((prev) => {
      return { ...prev, closing: true };
    });
  };

  const handleOpenProbing = () => {
    setModal((prev) => {
      return { ...prev, generalProbing: true };
    });
  };

  const handleOpenPhonetics = () => {
    setModal((prev) => {
      return { ...prev, phonetics: true };
    });
  };

  const handleOpenCC = () => {
    setModal((prev) => {
      return { ...prev, cc: true };
    });
  };

  const handleOpenCP = () => {
    setModal((prev) => {
      return { ...prev, cp: true };
    });
  };

  const handleOpenMCS = () => {
    setModal((prev) => {
      return { ...prev, mcs: true };
    });
  };

  const handleOpenAlpha = () => {
    setModal((prev) => {
      return { ...prev, alpha: true };
    });
  };

  return (
    <>
      <Card>
        <Card.Header>Help Window</Card.Header>
        <Card.Body>
          {/* <button
            className="btn btn-success globalBtn fw-bold"
            onClick={() => {
              handleOpenClosing();
            }}
          >
            Closing
          </button> */}
          <button
            className="btn btn-success globalBtn mt-2 fw-bold"
            onClick={() => {
              handleOpenPhonetics();
            }}
          >
            Phonetics
          </button>
          <button
            className="btn btn-success globalBtn mt-2 fw-bold"
            onClick={() => {
              handleOpenProbing();
            }}
          >
            General Probing
          </button>
          <button
            className="btn btn-success globalBtn mt-2 fw-bold"
            onClick={() => {
              handleOpenAlpha();
            }}
          >
            Alphabets / Numbers
          </button>

          {campaign == "CC" ? (
            <button
              className="btn btn-success globalBtn mt-2 fw-bold"
              onClick={() => {
                handleOpenCC();
              }}
            >
              Mandatory Closing CC
            </button>
          ) : campaign == "CP" ? (
            <button
              className="btn btn-success globalBtn mt-2 fw-bold"
              onClick={() => {
                handleOpenCP();
              }}
            >
              Mandatory Closing CP
            </button>
          ) : campaign == "MCS" ? (
            <button
              className="btn btn-success globalBtn mt-2 fw-bold"
              onClick={() => {
                handleOpenMCS();
              }}
            >
              Mandatory Closing MCS
            </button>
          ) : null}
        </Card.Body>
      </Card>

      {/*Closing  */}
      <Modal
        show={modal.closing}
        onHide={handleCloseClosing}
        dialogClassName="modal-90w"
      >
        <Modal.Body>
          <Row>
            <Col lg={3}>
              <Stack gap={3}>
                <StopNav />

                <Legends />
              </Stack>
            </Col>
            <Col lg={9}>
              <Card>
                <Card.Header>Closing</Card.Header>
                <Card.Body></Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      {/* Alphabets */}
      <Modal
        show={modal.alpha}
        onHide={() => {
          setModal((prev) => {
            return { ...prev, alpha: false };
          });
        }}
        dialogClassName="modal-90w"
      >
        <Modal.Body>
          <Row>
            <Col lg={3}>
              <Stack gap={3}>
                <StopNav />

                <Legends />
              </Stack>
            </Col>
            <Col lg={9}>
              <Card>
                <Card.Header>Alphabets</Card.Header>
                <Card.Body>
                  {alphabets
                    ? alphabets.map((a) => {
                        return (
                          <FillerBtn key={a.src} name={a.name} src={a.src} />
                        );
                      })
                    : null}
                  <hr />
                  {numbers
                    ? numbers.map((num) => {
                        return (
                          <FillerBtn
                            key={num.src}
                            name={num.name}
                            src={num.src}
                          />
                        );
                      })
                    : null}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      {/* Phonetics */}
      <Modal
        show={modal.phonetics}
        onHide={handleClosePhonetics}
        dialogClassName="modal-90w"
      >
        <Modal.Body>
          <Row>
            <Col lg={3}>
              <Stack gap={3}>
                <StopNav />

                <Legends />
              </Stack>
            </Col>
            <Col lg={9}>
              <Card>
                <Card.Header>Phonetics</Card.Header>
                <Card.Body>
                  {phonetics
                    ? phonetics.map((ph) => {
                        return (
                          <FillerBtn key={ph.src} name={ph.name} src={ph.src} />
                        );
                      })
                    : null}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/* General Probing */}
      <Modal
        show={modal.generalProbing}
        onHide={handleCloseProbing}
        dialogClassName="modal-90w"
      >
        <Modal.Body>
          <Row>
            <Col lg={3}>
              <Stack gap={3}>
                <StopNav />

                <Legends />
              </Stack>
            </Col>
            <Col lg={9}>
              <Card>
                <Card.Header>General Probing</Card.Header>
                <Card.Body>
                  {generalProbing
                    ? generalProbing.map((gen) => {
                        return (
                          <FillerBtn
                            key={gen.src}
                            name={gen.name}
                            src={gen.src}
                          />
                        );
                      })
                    : null}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/* CC*/}
      <Modal
        show={modal.cc}
        onHide={() => {
          setModal((prev) => {
            return { ...prev, cc: false };
          });
        }}
        dialogClassName="modal-90w"
      >
        <Modal.Body>
          <Row>
            <Col lg={3}>
              <Stack gap={3}>
                <StopNav />

                <Legends />
              </Stack>
            </Col>
            <Col lg={9}>
              <Card>
                <Card.Header>Mandatory Closing CC</Card.Header>
                <Card.Body>
                  {mandatoryClosingCC
                    ? mandatoryClosingCC.map((mcc) => {
                        return (
                          <FillerBtn
                            key={mcc.src}
                            name={mcc.name}
                            src={mcc.src}
                          />
                        );
                      })
                    : null}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/*CP*/}
      <Modal
        show={modal.cp}
        onHide={() => {
          setModal((prev) => {
            return { ...prev, cp: false };
          });
        }}
        dialogClassName="modal-90w"
      >
        <Modal.Body>
          <Row>
            <Col lg={3}>
              <Stack gap={3}>
                <StopNav />

                <Legends />
              </Stack>
            </Col>
            <Col lg={9}>
              <Card>
                <Card.Header>Mandatory Closing CP</Card.Header>
                <Card.Body>
                  {mandatoryClosingCP
                    ? mandatoryClosingCP.map((mccp) => {
                        return (
                          <FillerBtn
                            key={mccp.src}
                            name={mccp.name}
                            src={mccp.src}
                          />
                        );
                      })
                    : null}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/* MCS */}
      <Modal
        show={modal.mcs}
        onHide={() => {
          setModal((prev) => {
            return { ...prev, mcs: false };
          });
        }}
        dialogClassName="modal-90w"
      >
        <Modal.Body>
          <Row>
            <Col lg={3}>
              <Stack gap={3}>
                <StopNav />

                <Legends />
              </Stack>
            </Col>
            <Col lg={9}>
              <Card>
                <Card.Header>Mandatory Closing MCS</Card.Header>
                <Card.Body>
                  {mandatoryClosingMCS
                    ? mandatoryClosingMCS.map((mcmc) => {
                        return (
                          <FillerBtn
                            key={mcmc.src}
                            name={mcmc.name}
                            src={mcmc.src}
                          />
                        );
                      })
                    : null}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default HelpWindow;
