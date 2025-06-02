import { DailyReport } from "../models/DailyReport.model.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Flock } from "../models/Flock.model.js";
import { MonthlyReport } from "../models/MonthlyReport.model.js";
const addMonthlyReport = wrapAsync(async (req, res) => {
  const { flockId } = req.params;
  const { month, year } = req.body;
  let monthStartDate = new Date(year, month - 1, 1);
  let monthEndDate = new Date(year, month, 0);
  console.log(monthStartDate, monthEndDate);
  if (!flockId) {
    throw new ApiError(404, "Flock not found");
  }
  const flock = await Flock.findById(flockId);
  if (!flock) {
    throw new ApiError(404, "Flock not found");
  }
  const monthlyData = await DailyReport.aggregate([
    {
      $match: {
        flock: flock._id,
        Date: { $gte: monthStartDate, $lte: monthEndDate },
      },
    },
    {
      $group: {
        _id: null,
        totalMortality: { $sum: "$mortality" },
        totalFeedConsumed: { $sum: "$feedConsumed" },
        totalEggsCollected: { $sum: "$eggsCollected" },
      },
    },
  ]);
  let monthlyReport;
  if (monthlyData.length > 0) {
    const { totalEggsCollected, totalMortality, totalFeedConsumed } =
      monthlyData[0];
    monthlyReport = await MonthlyReport.findOneAndUpdate(
      {
        flock: flock._id,
        year: year,
        month: month,
      },
      {
        totalMortality: totalMortality,
        totalEggsCollected: totalEggsCollected,
        totalFeedConsumed: totalFeedConsumed,
      },
      {
        upsert: true,
        new: true,
      }
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Monthly Added Successfully", monthlyReport));
});
const deleteMonthlyReport = wrapAsync(async (req, res) => {
  const { flockId, monthlyReportId } = req.params;
  if (!flockId || !monthlyReportId) {
    throw new ApiError(401, "Ids not found to delete monthlyReport");
  }
  const flock = await Flock.findById(flockId);
  if (!flock) {
    throw new ApiError(404, "Flock not found");
  }
  const monthlyReport = await MonthlyReport.findById(monthlyReportId);
  if (!monthlyReport) {
    throw new ApiError(404, "No monthly report found to delete");
  }
  const deletedMonthlyReport = await MonthlyReport.findOneAndDelete(
    {
      flock: flock._id,
      _id: monthlyReport._id,
    },
    {
      new: true,
    }
  );

  if (!deletedMonthlyReport) {
    throw new ApiError(500, "Failed to delete weekly Report");
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Monthly report deleted successfully",
        deletedMonthlyReport
      )
    );
});
const deleteAllMonthlyReports = wrapAsync(async (req, res) => {
  const { flockId } = req.params;
  if (!flockId) {
    throw new ApiError(404, "Flock Id not found");
  }
  const flock = await Flock.findById(flockId);
  if (!flock) {
    throw new ApiError(404, "Flock not found");
  }
  const deletedMonthlyReports = await MonthlyReport.deleteMany({
    flock: flock._id,
  });
  if (!deletedMonthlyReports) {
    throw new ApiError(404, "No reports found to delete");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "All Monthly reports deleted successfully",
        deletedMonthlyReports
      )
    );
});
const getSingleMonthlyReport = wrapAsync(async (req, res) => {
  const { flockId, monthlyReportId } = req.params;
  if (!flockId || !monthlyReportId) {
    throw new ApiError(401, "Ids not found to get report");
  }
  const flock = await Flock.findById(flockId);
  if (!flock) {
    throw new ApiError(404, "flock not found");
  }
  const monthlyReport = await MonthlyReport.findOne({
    _id: monthlyReportId,
    flock: flock._id,
  });
  if (!monthlyReport) {
    throw new ApiError(404, "Monthly Report not found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, "Monthly Report Shown successfully", monthlyReport)
    );
});
const getAllMonthlyReports = wrapAsync(async (req, res) => {
  let allMonthlyReports = await MonthlyReport.find({});
  if (!allMonthlyReports) {
    throw new ApiError(404, "No Monthly Reports found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "All Monthly reports found successfully",
        allMonthlyReports
      )
    );
});
export {
  addMonthlyReport,
  deleteMonthlyReport,
  deleteAllMonthlyReports,
  getSingleMonthlyReport,
  getAllMonthlyReports,
};
