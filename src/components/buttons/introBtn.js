import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { callActions } from "../../store/call-slice";
import { audioActions } from "../../store/audio-slice";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
function IntroBtn({ name, src, script }) {
  const playAudio = (e) => {
    dispatch(callActions.addButton({ name: name, type: "intro" }));
    dispatch(audioActions.play(new Audio(src)));
    console.log(src);
  };
  let dispatch = useDispatch();
  const btnClicked = useSelector((state) => state.call.buttonClicked);
  return (
    <OverlayTrigger
      placement={"auto"}
      overlay={
        <Tooltip id={`tooltip-${"auto"}`}>
          <i>{script}</i>
        </Tooltip>
      }
    >
      <button
        className="btn btn-warning m-1 globalRec"
        onClick={() => {
          playAudio();
        }}
      >
        {name}
      </button>
    </OverlayTrigger>
  );
}

export default IntroBtn;
