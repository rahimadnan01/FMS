import { DailyReport } from "../models/DailyReport.model.js";
import { Flock } from "../models/Flock.model.js";
import { FeedStock } from "../models/FeedStock.model.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { deleteModel } from "mongoose";

const addDailyReport = wrapAsync(async (req, res) => {
  const { id } = req.params;
  // getting fields from user
  const {
    mortality,
    feedConsumed,
    eggsCollected,
    waterIntake,
    minTemp,
    maxTemp,
    medicine,
    eggWeight,
    birdAge,
  } = req.body;
  if (
    !mortality ||
    !feedConsumed ||
    !eggsCollected ||
    !waterIntake ||
    !minTemp ||
    !maxTemp ||
    !medicine ||
    !eggWeight ||
    !birdAge
  ) {
    throw new ApiError(401, "All fields are required");
  }
  if (!id) {
    throw new ApiError(401, "Id is required");
  }

  // finding flock
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
    waterIntake: waterIntake,
    minTemp: minTemp,
    maxTemp: maxTemp,
    medicine: medicine,
    eggWeight: eggWeight,
    birdAge: birdAge,
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
  flock.mortality = totalMortality;

  // finding totalProduction from DR
  const dailyReportProduction = await DailyReport.aggregate([
    { $match: { flock: flock._id } },
    { $group: { _id: null, total: { $sum: "$eggsCollected" } } },
  ]);

  // updating the flock production in flock
  const totalProduction = dailyReportProduction[0]?.total;
  if (totalProduction) flock.totalProduction = totalProduction;

  // finding the water Intake from the daily reports
  const dailyReportWaterIntake = await DailyReport.aggregate([
    { $match: { flock: flock._id } },
    { $group: { _id: null, total: { $sum: "$waterIntake" } } },
  ]);

  // updating the water Intake in the flock
  const totalWaterIntake = dailyReportWaterIntake[0]?.total || 0;
  console.log("totalWaterIntake", totalWaterIntake);
  flock.waterIntake = totalWaterIntake;

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
const updateDailyReport = wrapAsync(async (req, res) => {
  const { flockId, dailyReportId } = req.params;
  if (!flockId || !dailyReportId) {
    throw new ApiError(404, "Flock Id and daily repoty Id is not found");
  }
  const {
    mortality,
    eggsCollected,
    feedConsumed,
    waterIntake,
    minTemp,
    maxTemp,
    medicine,
    eggWeight,
    birdAge,
  } = req.body;

  const dailyReport = await DailyReport.findById(dailyReportId);
  if (!dailyReport) {
    throw new ApiError(404, "Report not found");
  }
  if (mortality) dailyReport.mortality = mortality;
  if (eggsCollected) dailyReport.eggsCollected = eggsCollected;
  if (feedConsumed) dailyReport.feedConsumed = feedConsumed;
  if (waterIntake) dailyReport.waterIntake = waterIntake;
  if (minTemp) dailyReport.minTemp = minTemp;
  if (maxTemp) dailyReport.maxTemp = maxTemp;
  if (medicine) dailyReport.medicine = medicine;
  if (eggWeight) dailyReport.eggWeight = eggWeight;
  if (birdAge) dailyReport.birdAge = birdAge;
  const updatedDailyReport = await dailyReport.save();
  if (!updatedDailyReport) {
    throw new ApiError(500, "Failed to update Daily report");
  }
  // finding flock
  const flock = await Flock.findById(flockId);
  if (!flock) {
    throw new ApiError(404, "Flock not found of this Id");
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
  flock.mortality = totalMortality;

  // finding totalProduction from DR
  const dailyReportProduction = await DailyReport.aggregate([
    { $match: { flock: flock._id } },
    { $group: { _id: null, total: { $sum: "$eggsCollected" } } },
  ]);

  // updating the flock production in flock
  const totalProduction = dailyReportProduction[0]?.total;
  if (totalProduction) flock.totalProduction = totalProduction;

  // finding waterIntake from DR
  const DailyWaterIntake = await DailyReport.aggregate([
    { $match: { flock: flock._id } },
    { $group: { _id: null, total: { $sum: "$waterIntake" } } },
  ]);

  // updating the flock water Intake in flock
  const totalWaterIntake = DailyWaterIntake[0]?.total;
  if (totalWaterIntake) flock.waterIntake = totalWaterIntake;

  const updatedFlock = await flock.save();
  if (!updatedFlock) {
    throw new ApiError(500, "Failed to update flock");
  }
  res.status(200).json(
    new ApiResponse(200, "Daily report updated successfully", {
      updatedDailyReport,
      updatedFeedStock,
      updatedFlock,
    })
  );
});
const deleteOneReport = wrapAsync(async (req, res) => {
  const { flockId, dailyReportId } = req.params;
  if (!flockId || !dailyReportId) {
    throw new ApiError(404, "Flock Id and daily repoty Id is not found");
  }

  const deletedDailyReport = await DailyReport.findByIdAndDelete(
    dailyReportId,
    {
      new: true,
    }
  );
  if (!deletedDailyReport) {
    throw new ApiError(404, "Report not found");
  }

  // finding fock
  const flock = await Flock.findById(flockId);
  if (!flock) {
    throw new ApiError(404, "Flock not found of this Id");
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
  flock.mortality = totalMortality;

  // finding totalProduction from DR
  const dailyReportProduction = await DailyReport.aggregate([
    { $match: { flock: flock._id } },
    { $group: { _id: null, total: { $sum: "$eggsCollected" } } },
  ]);

  // updaitng the flock production in flock
  const totalProduction = dailyReportProduction[0]?.total;
  flock.totalProduction = totalProduction;

  // finding waterIntake from DR
  const DailyWaterIntake = await DailyReport.aggregate([
    { $match: { flock: flock._id } },
    { $group: { _id: null, total: { $sum: "$waterIntake" } } },
  ]);

  // updating the flock water Intake in flock
  const totalWaterIntake = DailyWaterIntake[0]?.total || 0;
  flock.waterIntake = totalWaterIntake;

  const updatedFlock = await flock.save();
  if (!updatedFlock) {
    throw new ApiError(500, "Failed to update flock");
  }
  res.status(200).json(
    new ApiResponse(200, "Daily report updated successfully", {
      deletedDailyReport,
      updatedFeedStock,
      updatedFlock,
    })
  );
});
const deleteAllReport = wrapAsync(async (req, res) => {
  const { flockId } = req.params;
  if (!flockId) {
    throw new ApiError(404, "Flock not found of this id");
  }
  const flock = await Flock.findById(flockId);
  if (!flock) {
    throw new ApiError(404, "Flock not found");
  }
  const deletedDailyReport = await DailyReport.deleteMany({ flock: flock._id });
  if (!deletedDailyReport) {
    throw new ApiError(500, "Failed to delete all reports");
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "All reports deleted successfully",
        deletedDailyReport
      )
    );
});
const getSingleReport = wrapAsync(async (req, res) => {
  const { flockId, dailyReportId } = req.params;
  if (!flockId || !dailyReportId) {
    throw new ApiError(404, "Id is required ");
  }
  const flock = await Flock.findById(flockId);
  if (!flock) {
    throw new ApiError(404, "Flock not found");
  }
  // FIX: Find the daily report by its _id and flock
  const singleDailyReport = await DailyReport.findOne({
    _id: dailyReportId,
    flock: flock._id,
  });
  if (!singleDailyReport) {
    throw new ApiError(404, "Daily report not found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, "Daily report shown successfully", singleDailyReport)
    );
});
const getAllReports = wrapAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(401, "Id is required");
  }
  const flock = await Flock.findById(id);
  if (!flock) {
    throw new ApiError(404, "Flock not found");
  }
  const allReports = await DailyReport.find({ flock: flock._id });
  if (!allReports) {
    throw new ApiError(404, "No reports found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "All reports shown successfully", allReports));
});
export {
  addDailyReport,
  updateDailyReport,
  deleteOneReport,
  deleteAllReport,
  getSingleReport,
  getAllReports,
};
