import { wrapAsync } from "../utils/wrapAsync.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import { Staff } from "../models/staff.model.js"
import jwt from "jsonwebtoken"
import { generateAccessAndRefreshTokens } from "../utils/tokens.js"
// for registering the user
const registerStaff = wrapAsync(async (req, res) => {
    const { email, password, username } = req.body
    if (!email || !password || !username) {
        throw new ApiError(401, "All fields are required")
    }

    const existedUser = await Staff.findOne({ email: email })

    if (existedUser) {
        throw new ApiError(403, "User already exists with this email")
    }

    const user = await User.create({
        username: username,
        email: email,
        password: password,
        role: "staff"
    })

    if (!user) {
        throw new ApiError(500, "Something went wrong while generating the user")
    }



    const staff = await Staff.create({
        user: user._id
    })

    if (!staff) {
        throw new ApiError(500, "Something went wrong while generating the admin")
    }

    const createdStaff = await Staff.findById(staff._id).populate({
        path: "user",
        select: "username email role"
    })

    if (!createdStaff) {
        throw new ApiError(404, "Staff not found or may deleted")
    }

    res.status(200)
        .json(
            new ApiResponse(
                200,
                createdStaff,
                "Staff registered successfully"
            )
        )

})

// for log in user
const loginStaff = wrapAsync(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new ApiError(401, "All fields are required")
    }

    const user = await User.findOne({ email: email })

    if (!user) {
        throw new ApiError(404, "Invalid credentials user not found")
    }

    const validatePassword = await user.ValidatePassword(password)
    if (!validatePassword) {
        throw new ApiError(403, "Incorrect password ")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    if (!accessToken || !refreshToken) {
        throw new ApiError(404, "Tokens not found")
    }

    const loggedInUser = await User.findById(user._id).select("refreshToken password ")

    if (!loggedInUser) {
        throw new ApiError(401, "Failed to login user")
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200,
                { loggedInUser, accessToken, refreshToken },
                "User loggedIn successfully"
            )
        )

})

// for log out User
const logoutStaff = wrapAsync(async (req, res) => {


    const loggedOutUser = await User.findByIdAndUpdate(req.user._id, {
        $unset: {
            refreshToken: 1
        }
    }, {
        new: true
    })

    if (!loggedOutUser) {
        throw new ApiError(500, "Failed to log out User")
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "User logged out successfully"
            )
        )
})

// for refresh access Tokens
const refreshAccessToken = wrapAsync(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(404, "refresh Token not found")
    }

    let verifyRefreshToken
    try {
        if (incomingRefreshToken) {
            verifyRefreshToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_KEY)
        }

        const user = await User.findById(verifyRefreshToken._id)
        if (!user) {
            throw new ApiError(404, "Unauthorized User ,user not found")
        }

        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(403, "Unauthorized User")
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id)
        if (!accessToken || !newRefreshToken) {
            throw new ApiError(
                500,
                "Something went wrong while refreshing access token",
            );
        }

        let options = {
            httpOnly: true,
            secure: true,
        };

        res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    "refresh Access token successfully",
                    {
                        accessToken,
                        refreshToken: newRefreshToken,
                    }
                ),
            );
    } catch (error) {
        throw new ApiError(500, error.message)
    }
})

export { registerStaff, loginStaff, logoutStaff, refreshAccessToken }