import { useState } from "react";
import "./icons";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./assets/styles/index.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/FMS/Login",
    element: <LoginPage />,
  },
  {
    path: "/FMS/register",
    element: <RegisterPage />,
  },
  {
    path: "/FMS",
    element: <HomePage />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
