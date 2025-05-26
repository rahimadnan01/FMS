import Router from "express";
import {
  addWeeklyReport,
  deleteWeeklyReport,
} from "../controllers/WeeklyReport.controller.js";
const router = Router();
// TODO write routes for deleting all reports and for gettign single and multiple reports
router.route("/flocks/:flockId/weeklyReport").post(addWeeklyReport);
router
  .route("/flocks/:flockId/weeklyReport/:weeklyReportId")
  .delete(deleteWeeklyReport);

export default router;
