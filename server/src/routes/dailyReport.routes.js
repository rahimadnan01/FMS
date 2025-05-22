import Router from "express";
import { addDailyReport } from "../controllers/DailyReport.controller.js";
const router = Router();
router.route("/flocks/:id").post(addDailyReport);
export default router;
