import Router from "express";
const router = Router();
import {
  loginAdmin,
  logoutAdmin,
  registerAdmin,
} from "../../controllers/Admin.controller.js";
import { verifyJwt } from "../../middlewares/auth.middelware.js";
import { refreshToken } from "../../utils/refreshToken.js";
router.route("/admin/register").post(registerAdmin);
router.route("/admin/login").post(loginAdmin);
router.route("/admin/logout").post(verifyJwt("admin"), logoutAdmin);
router.route("/refreshToken").post(refreshToken);
export default router;
