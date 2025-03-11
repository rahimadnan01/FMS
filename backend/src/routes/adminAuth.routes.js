import Router from "express"
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/adminAuth.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/admin/register").post(verifyJwt("admin"), registerUser)
router.route("/admin/login").post(loginUser)
router.route("/admin/logout").post(verifyJwt(), logoutUser)
router.route("/auth/refreshToken").post(refreshAccessToken)

export default router