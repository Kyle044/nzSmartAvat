import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { callActions } from "../../store/call-slice";
import { audioActions } from "../../store/audio-slice";
function FillerBtn({ name, src }) {
  const playAudio = (e) => {
    dispatch(callActions.addButton({ name: name, type: "filler" }));
    dispatch(audioActions.play(new Audio(src)));
  };
  let dispatch = useDispatch();
  const btnClicked = useSelector((state) => state.call.buttonClicked);

  return (
    <>
      <button
        className="btn btn-dark m-1 globalRec"
        onClick={() => {
          playAudio();
        }}
      >
        {name}
      </button>
    </>
  );
}

export default FillerBtn;
