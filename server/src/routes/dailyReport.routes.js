import Router from "express";
import {
  addDailyReport,
  deleteAllReport,
  deleteOneReport,
  getAllReports,
  getSingleReport,
  updateDailyReport,
} from "../controllers/DailyReport.controller.js";
const router = Router();
router
  .route("/flocks/:id/dailyReports")
  .post(addDailyReport)
  .get(getAllReports);
router
  .route("/flocks/:flockId/dailyReport/:dailyReportId")
  .get(getSingleReport)
  .put(updateDailyReport)
  .delete(deleteOneReport);
router.route("/flocks/:flockId/dailyReports/deleteAll").delete(deleteAllReport);
export default router;
