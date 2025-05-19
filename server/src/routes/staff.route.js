import Router from "express";
import {
  deleteAllStaff,
  deleteSingleStaff,
  getAllStaff,
  getSingleStaff,
} from "../controllers/Staff.controller.js";
const router = Router();
router.route("/staff").get(getAllStaff).delete(deleteAllStaff);
router.route("/staff/:id").get(getSingleStaff).delete(deleteSingleStaff);
export default router;
