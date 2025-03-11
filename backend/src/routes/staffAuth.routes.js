import Router from "express"
import { registerStaff, loginStaff, logoutStaff } from "../controllers/staffAuth.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/staff/register").post(verifyJwt("admin"), registerStaff)
router.route("/staff/login").post(loginStaff)
router.route("/staff/logout").post(verifyJwt(), logoutStaff)

export default router