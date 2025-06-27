import { useState } from "react";
import "./utils/icons";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./assets/styles/index.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import FlocksPage from "./pages/FlocksPage";
import UpdateFlockPage from "./pages/UpdateFlockPage";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
} from "react-router-dom";
import ViewFlockPage from "./pages/ViewFlockPage";
import DailyReportsPage from "./pages/DailyReportsPage";
import MonthlyReports from "./pages/MonthlyReports";
import WeeklyReports from "./pages/WeeklyReports";
import AddFlockPage from "./pages/AddFlock";
import ViewDailyReport from "./pages/ViewDailyReport";
import UpdateDailyReport from "./pages/UpdateDailyReport";
import AddDailyReport from "./pages/AddDailyReport";
import ViewMonthlyReport from "./pages/ViewMonthlyReport";
import AddMonthlyReport from "./pages/AddMonthlyReport";
import ViewWeeklyReport from "./pages/ViewWeeklyReport";
import AddWeeklyReport from "./pages/AddWeeklyReport";
import Staff from "./pages/Staff";
import AddStaff from "./pages/AddStaff";
import LoginAlert from "./components/UI/LoginAlert";
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
    element: <UpdateFlockPage />,
  },
  {
    path: "/FMS/flocks/:id/dailyReports",
    element: <DailyReportsPage />,
  },
  {
    path: "/FMS/flocks/:id/monthlyReports",
    element: <MonthlyReports />,
  },
  {
    path: "/FMS/flocks/:id/weeklyReports",
    element: <WeeklyReports />,
  },
  {
    path: "/FMS/flocks/addFlock",
    element: <AddFlockPage />,
  },
  {
    path: "/FMS/flocks/:id/dailyReports/:dailyReportId",
    element: <ViewDailyReport />,
  },
  {
    path: "/FMS/flocks/:id/dailyReports/:dailyReportId/update",
    element: <UpdateDailyReport />,
  },
  {
    path: "/FMS/flocks/:id/dailyReports/add",
    element: <AddDailyReport />,
  },
  {
    path: "/FMS/flocks/:id/monthlyReports/:monthlyReportId",
    element: <ViewMonthlyReport />,
  },
  {
    path: "/FMS/flocks/:id/monthlyReports/add",
    element: <AddMonthlyReport />,
  },
  {
    path: "/FMS/flocks/:id/weeklyReport/:weeklyReportId",
    element: <ViewWeeklyReport />,
  },
  {
    path: "/FMS/flocks/:id/weeklyReport/add",
    element: <AddWeeklyReport />,
  },
  {
    path: "/FMS/staff",
    element: <Staff />,
  },
  {
    path: "/FMS/add-staff",
    element: <AddStaff />,
  },
]);
function App() {
  return (
    <>
      <LoginAlert />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
