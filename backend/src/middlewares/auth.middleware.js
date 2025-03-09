import { wrapAsync } from "../utils/wrapAsync.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const verifyJwt = (role) => wrapAsync(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header?.("Authorization")?.replace("Bearer", "")

        if (!token) {
            throw new ApiError(403, "Unauthorized User token not found")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
        if (!decodedToken) {
            throw new ApiError(500, "Something went wrong while decoding the token")
        }

        const user = await User.findById(decodedToken._id)
        if (!user) {
            throw new ApiError(404, "User not found while decoding the token")
        }
        if (role && user.role !== role) {
            throw new ApiError(403, `Access Denied only ${role} can accessed to this path`)
        }

        req.user = user
        next()
    } catch (error) {
        throw new ApiError(500, error.message)
    }
})