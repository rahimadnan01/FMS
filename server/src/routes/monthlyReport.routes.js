import Router from "express";
import {
  addMonthlyReport,
  deleteAllMonthlyReports,
  deleteMonthlyReport,
  getAllMonthlyReports,
  getSingleMonthlyReport,
} from "../controllers/MonthlyReports.controller.js";
const router = Router();
router
  .route("/flocks/:flockId/monthlyReports")
  .get(getAllMonthlyReports)
  .post(addMonthlyReport)
  .delete(deleteAllMonthlyReports);
router
  .route("/flocks/:flockId/monthlyReports/:monthlyReportId")
  .delete(deleteMonthlyReport)
  .get(getSingleMonthlyReport);

export default router;
