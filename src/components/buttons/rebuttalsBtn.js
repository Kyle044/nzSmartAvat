import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { callActions } from "../../store/call-slice";
import { audioActions } from "../../store/audio-slice";
function RebuttalsBtn({ name, src, closing, probing }) {
  const playAudio = (e) => {
    dispatch(callActions.addButton({ name: name, type: "rebuttals" }));
    dispatch(audioActions.play(new Audio(src)));
    console.log(src);
  };
  let dispatch = useDispatch();
  const btnClicked = useSelector((state) => state.call.buttonClicked);
  return (
    <button
      className={
        closing == true && probing == false
          ? `btn btn-danger m-1 globalRec`
          : closing == false && probing == true
          ? `btn btn-info m-1 globalRec`
          : `  rebBtn m-1 globalRec`
      }
      onClick={() => {
        playAudio();
      }}
    >
      {name} {closing}
    </button>
  );
}

export default RebuttalsBtn;
