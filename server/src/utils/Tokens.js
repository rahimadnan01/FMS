import mongoose from "mongoose";
import { ApiError } from "./ApiError.js";
import { User } from "../models/User.model.js";
import { wrapAsync } from "./wrapAsync.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found of this Id");
    }
    const accessToken = user.generateAccessToken();
    if (!accessToken) {
      throw new ApiError(
        500,
        "Something went wrong while generatig the access Token"
      );
    }
    const refreshToken = user.generateRefreshToken();
    if (!refreshToken) {
      throw new ApiError(
        500,
        "Something went wrong while generatig the refresh Token"
      );
    }

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          refreshToken: refreshToken,
        },
      },
      {
        new: true,
      }
    );
    if (!updatedUser) {
      throw new ApiError(500, "Failed to updated refreshToken");
    }
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(error.status, error.message);
  }
};
export { generateAccessAndRefreshToken };
