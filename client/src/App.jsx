import { useState } from "react";
import "./utils/icons";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./assets/styles/index.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import FlocksPage from "./pages/FlocksPage";
import UpdateFlockPage from "./pages/UpdateFlockPage"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ViewFlockPage from "./pages/ViewFlockPage";

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
  {
    path: "/FMS/flocks",
    element: <FlocksPage />,
  },
  {
    path: "/FMS/flocks/:id",
    element: <ViewFlockPage />,
  },
  {
    path: "/FMS/flocks/:id/updateFlock",
    element:<UpdateFlockPage/>
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
