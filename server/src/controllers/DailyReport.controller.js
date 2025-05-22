import { DailyReport } from "../models/DailyReport.model.js";
import { Flock } from "../models/Flock.model.js";
import { FeedStock } from "../models/FeedStock.model.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addDailyReport = wrapAsync(async (req, res) => {
  const { id } = req.params;
  // getting fields from user
  const { mortality, feedConsumed, eggsCollected } = req.body;
  if (!mortality || !feedConsumed || !eggsCollected) {
    throw new ApiError("Al fields are required");
  }
  if (!id) {
    throw new ApiError(401, "Id is required");
  }

  // finding fock
  const flock = await Flock.findById(id);
  if (!flock) {
    throw new ApiError(404, "Flock not found of this Id");
  }

  // creating daily report
  let dailyReport = await DailyReport.create({
    flock: flock._id,
    mortality: mortality,
    feedConsumed: feedConsumed,
    eggsCollected: eggsCollected,
  });

  const createdDailyReport = await DailyReport.findById(dailyReport._id);
  if (!createdDailyReport) {
    throw new ApiError(500, "failed to create daily report");
  }

  //finding feed stock of particular flock
  const feedStock = await FeedStock.findOne({ flock: flock._id });

  // calculating total feed consumed from DR
  const totalConsumed = await DailyReport.aggregate([
    { $match: { flock: flock._id } },
    { $group: { _id: null, total: { $sum: "$feedConsumed" } } },
  ]);
  const totalFeedConsumed = totalConsumed[0]?.total || 0;

  // updating feed stock
  if (totalFeedConsumed) feedStock.feedConsumed = totalFeedConsumed;
  let updatedFeedStock = await feedStock.save();
  if (!updatedFeedStock) {
    throw new ApiError(500, "Failed to update feed Stock");
  }

  //finding total mortality

  const dailyReportMortality = await DailyReport.aggregate([
    { $match: { flock: flock._id } },
    { $group: { _id: null, total: { $sum: "$mortality" } } },
  ]);

  // updating flock mortality
  const totalMortality = dailyReportMortality[0]?.total || 0;
  if (totalMortality) flock.mortality = totalMortality;

  // finding totalProduction from DR
  const dailyReportProduction = await DailyReport.aggregate([
    { $match: { flock: flock._id } },
    { $group: { _id: null, total: { $sum: "$eggsCollected" } } },
  ]);

  // updaitng the flock production in flock
  const totalProduction = dailyReportProduction[0]?.total;
  if (totalProduction) flock.totalProduction = totalProduction;

  const updatedFlock = await flock.save();
  if (!updatedFlock) {
    throw new ApiError(500, "Failed to update flock");
  }

  res.status(200).json(
    new ApiResponse(200, "Daily report created successfully", {
      createdDailyReport,
      updatedFeedStock,
      updatedFlock,
    })
  );
});
export { addDailyReport };
