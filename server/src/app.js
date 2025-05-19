import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
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
// routes usage
app.use("/api/v1", adminAuthRoute);
app.use("/api/v1", staffAuthRoute);
app.use("/api/v1",staffRoute)
app.use(notFoundHandler);
app.use(errorHandler);
