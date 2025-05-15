import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set(express.static("public"));
export { app };
// routs decleration
import adminAuthRoute from "./routes/authentication/adminAuth.routes.js";
// routes usage
app.use("/api/v1", adminAuthRoute);
app.all("*", (req, res, next) => {
  next({ status: 500, message: "page not found" });
});
app.use(errorHandler);
