import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CC from "./components/campaigns/CC";
import CP from "./components/campaigns/CP";
import MCS from "./components/campaigns/MCS";
import Master from "./components/campaigns/Master";
import "./css/style.css";
function MasterRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Master />} />
        <Route path="/CC" element={<CC />} />
        <Route path="/CP" element={<CP />} />
        <Route path="/MCS" element={<MCS />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MasterRouter;
