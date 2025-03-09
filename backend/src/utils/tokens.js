import { User } from "../models/user.model.js";
import { ApiError } from "./ApiError.js";
import { wrapAsync } from "./wrapAsync.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new ApiError(404, "User not found of this id")
        }

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        if (!accessToken || !refreshToken) {
            throw new ApiError(500, "Something went wrong while generating the access and refresh token")
        }

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        await User.findByIdAndUpdate(user._id, {
            refreshToken: refreshToken
        })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(400, error.message)
    }

}

export { generateAccessAndRefreshTokens }