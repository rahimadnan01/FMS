import Router from "express";
import {
  addWeeklyReport,
  deleteAllWeeklyReports,
  deleteWeeklyReport,
  getAllWeeklyReports,
  getSingleWeeklyReport,
} from "../controllers/WeeklyReport.controller.js";
const router = Router();

router
  .route("/flocks/:flockId/weeklyReport")
  .post(addWeeklyReport)
  .get(getAllWeeklyReports)
  .delete(deleteAllWeeklyReports);
router
  .route("/flocks/:flockId/weeklyReport/:weeklyReportId")
  .delete(deleteWeeklyReport)
  .get(getSingleWeeklyReport);

export default router;
