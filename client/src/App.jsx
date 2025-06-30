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
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/flocks",
    element: <FlocksPage />,
  },
  {
    path: "/flocks/:id",
    element: <ViewFlockPage />,
  },
  {
    path: "/flocks/:id/updateFlock",
    element: <UpdateFlockPage />,
  },
  {
    path: "/flocks/:id/dailyReports",
    element: <DailyReportsPage />,
  },
  {
    path: "/flocks/:id/monthlyReports",
    element: <MonthlyReports />,
  },
  {
    path: "/flocks/:id/weeklyReports",
    element: <WeeklyReports />,
  },
  {
    path: "/flocks/addFlock",
    element: <AddFlockPage />,
  },
  {
    path: "/flocks/:id/dailyReports/:dailyReportId",
    element: <ViewDailyReport />,
  },
  {
    path: "/flocks/:id/dailyReports/:dailyReportId/update",
    element: <UpdateDailyReport />,
  },
  {
    path: "/flocks/:id/dailyReports/add",
    element: <AddDailyReport />,
  },
  {
    path: "/flocks/:id/monthlyReports/:monthlyReportId",
    element: <ViewMonthlyReport />,
  },
  {
    path: "/flocks/:id/monthlyReports/add",
    element: <AddMonthlyReport />,
  },
  {
    path: "/flocks/:id/weeklyReport/:weeklyReportId",
    element: <ViewWeeklyReport />,
  },
  {
    path: "/flocks/:id/weeklyReport/add",
    element: <AddWeeklyReport />,
  },
  {
    path: "/staff",
    element: <Staff />,
  },
  {
    path: "/add-staff",
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
