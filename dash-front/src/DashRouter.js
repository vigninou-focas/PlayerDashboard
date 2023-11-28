import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Register from "./views/Register";
import Login from "./views/Login";
import ListPlayer from "./views/ListPlayer";
import ShowPlayer from "./components/players/ShowPlayer";

function DashRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListPlayer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/addplayer" element={<Login />} />
        <Route path="/show" element={<ShowPlayer />} />
      </Routes>
    </Router>
  );
}

export default DashRouter;
