import Router from "express";
const router = Router();
import {
  loginStaff,
  logoutStaff,
  registerStaff,
} from "../../controllers/Staff.controller.js";
import { verifyJwt } from "../../middlewares/auth.middelware.js";
router.route("/staff/register").post(registerStaff);
router.route("/staff/login").post(loginStaff);
router.route("/staff/logout").post(verifyJwt("staff"), logoutStaff);
export default router;
