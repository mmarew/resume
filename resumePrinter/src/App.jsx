import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ResumeContext from "./Components/ResumeContext/ResumeContext";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgetPassword from "./Pages/ForgetPassword";
import "./App.css";
function App() {
  return (
    <Routes>
      <Route path="/forgotPassword" element={<ForgetPassword />} />
      <Route path="/" element={<ResumeContext />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
