import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./views/Register";
import Login from "./views/Login";
import ListPlayer from "./views/ListPlayer";
import MailVerification from "./components/MailVerification";
import WaitConfMail from "./components/WaitConfMail";

function DashRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListPlayer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verification/:id" element={<MailVerification />} />
        <Route path="/confirmation" element={<WaitConfMail />} />
      </Routes>
    </Router>
  );
}

export default DashRouter;
