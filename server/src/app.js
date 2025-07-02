import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://fms-gdb9.vercel.app"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
export { app };
// routs decleration
import adminAuthRoute from "./routes/authentication/adminAuth.routes.js";
import staffAuthRoute from "./routes/authentication/staffAuth.routes.js";
import staffRoute from "./routes/staff.route.js";
import { notFoundHandler } from "./middlewares/notFound.middelware.js";
import flockRouter from "./routes/flock.routes.js";
import dailyReportRoute from "./routes/dailyReport.routes.js";
import weeklyReportRoute from "./routes/weeklyReport.routes.js";
import monthlyReportRoute from "./routes/monthlyReport.routes.js";
// routes usage
app.use("/api/v1", adminAuthRoute);
app.use("/api/v1", staffAuthRoute);
app.use("/api/v1", staffRoute);
app.use("/api/v1", flockRouter);
app.use("/api/v1", dailyReportRoute);
app.use("/api/v1", weeklyReportRoute);
app.use("/api/v1", monthlyReportRoute);
app.use(notFoundHandler);
app.use(errorHandler);
