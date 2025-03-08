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





app.all("*", (req, res, next) => {
    next({ status: 500, message: "Page not found" });
});

app.use(errorHandler);