import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { wrapAsync } from "../utils/wrapAsync.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.model.js";

const verifyJwt = (role) =>
  wrapAsync(async (req, res, next) => {
    try {
      const tokens =
        req.cookies.accessToken ||
        req.header("Authorization")?.replace("Bearer", "");
      if (!tokens) {
        throw new ApiError(403, "User is unauthorized");
      }
      const decodedToken = jwt.verify(tokens, process.env.ACCESS_TOKEN_KEY);
      if (!decodedToken._id) {
        throw new ApiError(
          500,
          "Somethign went wrong while Decoding the tokens"
        );
      }

      const user = await User.findById(decodedToken._id).select(" -passowrd");

      if (!user) {
        throw new ApiError(500, "Failed to find the User");
      }
      if (role && user.role !== role) {
        throw new ApiError(403, `Access Denied to the ${role}`);
      }

      req.user = user;
      next();
    } catch (error) {
      throw new ApiError(error.statusCode, error.message);
    }
  });

export { verifyJwt };
