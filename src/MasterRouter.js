import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CC from "./components/campaigns/CC";
import CP from "./components/campaigns/CP";
import MCS from "./components/campaigns/MCS";
import Master from "./components/campaigns/Master";
import Log from "./pages/Log";
import SingleLog from "./pages/SingleLog";
import { useSelector, useDispatch } from "react-redux";
import { callActions } from "./store/call-slice";
import { audioActions } from "./store/audio-slice";
import "./css/style.css";
function MasterRouter() {
  let dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "s") {
        dispatch(audioActions.play(new Audio("/assets/resources/blank.wav")));
      }
    });
    // window.addEventListener(
    //   "beforeunload",
    //   function (e) {
    //     localStorage.clear();
    //   },
    //   false
    // );
  });
  return (
    <BrowserRouter basename="/nz_avat">
      <Routes>
        <Route path="/" element={<Master />} />
        <Route path="/CC" element={<CC />} />
        <Route path="/CP" element={<CP />} />
        <Route path="/MCS" element={<MCS />} />
        <Route path="/Log" element={<Log />} />
        <Route path="/ButtonHistory" element={<SingleLog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MasterRouter;
