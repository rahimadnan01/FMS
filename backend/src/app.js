import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
const app = express();

app.use(
    cors({
        credentials: true,
        origin: process.env.CORS_ORIGIN,
    }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set(express.static("public"));
export { app };

// importing routes
import adminAuthRoute from "./routes/adminAuth.routes.js"
import staffAuthRoute from "./routes/staffAuth.routes.js"

// declaring the routes
app.use("/api/v1", adminAuthRoute)
app.use("/api/v1", staffAuthRoute)

app.all("*", (req, res, next) => {
    next({ status: 404, message: "Page not found" });
});

app.use(errorHandler);