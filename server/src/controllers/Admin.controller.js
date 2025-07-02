import mongoose from "mongoose";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { Admin } from "../models/Admin.model.js";
import { generateAccessAndRefreshToken } from "../utils/Tokens.js";
const registerAdmin = wrapAsync(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({ email: email });
  if (existedUser) {
    throw new ApiError(401, "User of this email already exists");
  }
  const user = await User.create({
    username: username,
    email: email,
    password: password,
    role: "admin",
  });

  const userCreated = await User.findById(user._id).select("-password");
  if (!userCreated) {
    throw new ApiError(500, "Something went wrong while creating the user");
  }

  const admin = await Admin.create({
    user: userCreated._id,
  });

  if (!admin) {
    throw new ApiError(500, "Somethign went wrong while creating the admin");
  }
  const createdAdmin = await Admin.findById(admin._id).populate({
    path: "user",
    populate: "username email",
  });
  if (!createdAdmin) {
    throw new ApiError(500, "Failed to register admin");
  }
  res.status(200).json(
    new ApiResponse(200, "Admin registered succressfully", {
      userCreated,
      createdAdmin,
    })
  );
});
const loginAdmin = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    throw new ApiError(401, "All fields are required");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new ApiError(401, "Invalid credentials ,User not found");
  }

  const validatePassword = await user.isPasswordCorrect(password);
  if (!validatePassword) {
    throw new ApiResponse(
      403,
      "Access denied invalid password ,Put correct password"
    );
  }
  if (user.role !== "admin") {
    throw new ApiError(403, "access denied Not an Admin");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  if (!accessToken || !refreshToken) {
    throw new ApiError(500, "Failed to generate Tokens");
  }
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!loggedInUser) {
    throw new ApiError(500, "Failed to login admin");
  }
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, "Admin logged in successfully", {
        loggedInUser,
        accessToken: accessToken,
        refreshToken: refreshToken,
      })
    );
});
const logoutAdmin = wrapAsync(async (req, res) => {
  const user = req.user;
  if (user && user._id) {
    await User.findByIdAndUpdate(
      user._id,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );
  }
  // Always clear cookies, even if user not found
  let options = { httpOnly: true, secure: true };
  res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, "User logged out successfully"));
});

export { registerAdmin, loginAdmin, logoutAdmin };
