import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Register from './views/Register';
import Login from './views/Login';
import ListPlayer from './views/ListPlayer';


function DashRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/players" element={<ListPlayer />} />
        <Route path="/addplayer" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default DashRouter;
