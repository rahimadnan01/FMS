import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./assets/styles/index.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/FMS/Login" element={<LoginPage />} />
        <Route path="/FMS/register" element={<RegisterPage />} />
        <Route path="/FMS" element={<HomePage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
