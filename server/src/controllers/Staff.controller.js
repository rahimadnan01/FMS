import { Staff } from "../models/Staff.model.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAccessAndRefreshToken } from "../utils/Tokens.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import jwt from "jsonwebtoken";

const registerStaff = wrapAsync(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new ApiError(401, "All fields are required");
  }
  const existedUser = await User.findOne({ email: email });
  if (existedUser) {
    throw new ApiError(401, "User already exists of this email");
  }
  const user = await User.create({
    username: username,
    email: email,
    password: password,
    role: "staff",
  });
  if (!user) {
    throw new ApiError(500, "Something went wrong while creating the user");
  }
  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError(500, "failed to get created User");
  }

  const staff = await Staff.create({
    user: user._id,
  });
  if (!staff) {
    throw new ApiError(500, "Failed to register te staff");
  }

  res.status(200).json(
    new ApiResponse(200, "Staff registered successfully", {
      createdUser,
      staff,
    })
  );
});
const loginStaff = wrapAsync(async (req, res) => {
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
  if (user.role !== "staff") {
    throw new ApiError(403, "access denied Not an Staff");
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
    secure: "production",
    sameSite: "None",
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, "Staff logged in successfully", {
        loggedInUser,
        accessToken: accessToken,
        refreshToken: refreshToken,
      })
    );
});
const logoutStaff = wrapAsync(async (req, res) => {
  const user = req.user;
  console.log(user);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const loggedOutUser = await User.findByIdAndUpdate(
    user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  if (!loggedOutUser) {
    throw new ApiError(500, "Failed to logout User");
  }
  let options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(
      new ApiResponse(200, "User logged out successfully", { loggedOutUser })
    );
});
const getAllStaff = wrapAsync(async (req, res) => {
  const allStaff = await Staff.find({}).populate({
    path: "user",
    select: "username email role",
  });
  if (!allStaff) {
    throw new ApiError(500, "Failed to fetch staff");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "Staff fetched successfully", allStaff));
});
const getSingleStaff = wrapAsync(async (req, res) => {
  let { id } = req.params;
  if (!id) {
    throw new ApiError(401, "Staff not found of this id");
  }
  const singleStaff = await Staff.findById(id).populate({
    path: "user",
    select: "username email role",
  });
  if (!singleStaff) {
    throw new ApiError(500, "Failed to fetch a single Staff");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "Staff fetched successfully", { singleStaff }));
});
const deleteSingleStaff = wrapAsync(async (req, res) => {
  let { id } = req.params;
  if (!id) {
    throw new ApiError(401, "User not found of thid Id");
  }

  const singleStaff = await Staff.findById(id).populate({
    path: "user",
    select: "username email role",
  });
  if (!singleStaff) {
    throw new ApiError(400, "No staff found");
  }
  const staffEmail = singleStaff.user?.email;
  if (!staffEmail) {
    throw new ApiError(500, "failed to fetch email");
  }
  const deletedUser = await User.findOneAndDelete({ email: staffEmail });
  if (!deletedUser) {
    throw new ApiError(500, "failed to delete User");
  }
  const deletedStaff = await Staff.findByIdAndDelete(id, {
    new: true,
  });
  if (!deletedStaff) {
    throw new ApiError(500, "Failed to delete Staff");
  }
  res.status(200).json(
    new ApiResponse(200, "Staff deleted successfully", {
      deletedStaff,
      singleStaff,
      deletedUser,
    })
  );
});
const deleteAllStaff = wrapAsync(async (req, res) => {
  const deletedStaff = await Staff.deleteMany({});
  if (!deletedStaff) {
    throw new ApiError(500, "failed to deleted Staff");
  }
  const deletedUsers = await User.deleteMany({ role: "staff" });
  if (!deletedUsers) {
    throw new ApiError(500, "Failed to delet all users of role staff");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "staff deleted successfully", { deletedStaff }));
});

export {
  registerStaff,
  loginStaff,
  logoutStaff,
  getAllStaff,
  getSingleStaff,
  deleteSingleStaff,
  deleteAllStaff,
};
