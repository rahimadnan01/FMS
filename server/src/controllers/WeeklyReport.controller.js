import { DailyReport } from "../models/DailyReport.model.js";
import { Flock } from "../models/Flock.model.js";
import { WeeklyReport } from "../models/WeeklyReport.model.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addWeeklyReport = wrapAsync(async (req, res) => {
  const { flockId } = req.params;
  const { weekStartDate, weekEndDate } = req.body;
  if (!weekStartDate || !weekEndDate) {
    throw new ApiError(401, "All Fields are required");
  }
  if (!flockId) {
    throw new ApiError(401, "Flock Id is required");
  }
  const flock = await Flock.findById(flockId);
  if (!flock) {
    throw new ApiError(404, "Flock not found of this Id");
  }

  const weeklyData = await DailyReport.aggregate([
    {
      $match: {
        flock: flock._id,
        Date: { $gte: new Date(weekStartDate), $lte: new Date(weekEndDate) },
      },
    },
    {
      $group: {
        _id: null,
        totalMortality: { $sum: "$mortality" },
        totalEggsCollected: { $sum: "$eggsCollected" },
        totalFeedConsumed: { $sum: "$feedConsumed" },
      },
    },
  ]);
  console.log(weeklyData);
  let weeklyReport;
  if (weeklyData.length > 0) {
    const { totalMortality, totalFeedConsumed, totalEggsCollected } =
      weeklyData[0];
    weeklyReport = await WeeklyReport.findOneAndUpdate(
      {
        flock: flockId,
        weekStartDate: weekStartDate,
        weekEndDate: weekEndDate,
      },
      {
        totalMortality,
        totalEggsCollected,
        totalFeedConsumed,
      },
      {
        upsert: true,
        new: true,
      }
    );
  } else {
    throw new ApiError(
      404,
      "No daily reports found to calculate Weekly Report"
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Weekly report Generated Successfully", weeklyReport)
    );
});

const deleteWeeklyReport = wrapAsync(async (req, res) => {
  const { flockId, weeklyReportId } = req.params;
  if (!flockId || !weeklyReportId) {
    throw new ApiError(401, "Ids not found to delete weeklyReport");
  }
  const flock = await Flock.findById(flockId);
  if (!flock) {
    throw new ApiError(404, "Flock not found");
  }
  const weeklyReport = await WeeklyReport.findById(weeklyReportId);
  if (!weeklyReport) {
    throw new ApiError(404, "No weekly report found to delete");
  }
  const deletedWeeklyReport = await WeeklyReport.findOneAndDelete(
    {
      flock: flock._id,
      _id: weeklyReport._id,
    },
    {
      new: true,
    }
  );

  if (!deletedWeeklyReport) {
    throw new ApiError(500, "Failed to delete weekly Report");
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Weekly report deleted succcessfully",
        deleteWeeklyReport
      )
    );
});

//TODO test this API ROUTE
const deleteAllWeeklyReports = wrapAsync(async (req, res) => {
  const { flockId } = req.params;
  if (!flockId) {
    throw new ApiError(404, "Flock Id not found");
  }
  const flock = await Flock.findById(flockId);
  if (!flock) {
    throw new ApiError(404, "Flock not found");
  }
  const deletedWeeklyReports = await WeeklyReport.deleteMany({
    flock: flock._id,
  });
  if (!deletedWeeklyReports) {
    throw new ApiError(404, "No reports found to delete");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "All Weekly reports deleted successfully",
        deletedWeeklyReports
      )
    );
});
// TODO test this ApiRoute
const getSingleWeeklyReport = wrapAsync(async (req, res) => {
  const { flockId, weeklyReportId } = req.params;
  if (!flockId || !weeklyReportId) {
    throw new ApiError(401, "Ids not found to get report");
  }
  const flock = await Flock.findById(flockId);
  if (!flock) {
    throw new ApiError(404, "flock not found");
  }
  const weeklyReport = await WeeklyReport.findOne({
    _id: weeklyReportId,
    flock: flock._id,
  });
  if (weeklyReport) {
    throw new ApiError(404, "Weekly Report not found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, "Weekly Report Shoen successfully", weeklyReport)
    );
});
// TODO write Api rouet for getting All reports 
export { addWeeklyReport, deleteWeeklyReport, deleteAllWeeklyReports };
