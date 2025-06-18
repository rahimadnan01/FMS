import { Flock } from "../models/Flock.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { FeedStock } from "../models/FeedStock.model.js";
import { DailyReport } from "../models/DailyReport.model.js";
const addFlock = wrapAsync(async (req, res) => {
  const { name, breed, totalBirds, totalFeedStock } = req.body;
  if (!name || !breed || !totalBirds || !totalFeedStock) {
    throw new ApiError(401, "All fields are required");
  }
  const existedFlock = await Flock.findOne({ name: name });
  if (existedFlock) {
    throw new ApiError(401, "flock alredy existed");
  }

  const flock = await Flock.create({
    name: name,
    breed: breed,
    totalBirds: totalBirds,
  });
  const createdFlock = await Flock.findById(flock._id);
  if (!createdFlock) {
    throw new ApiError(500, "Something went wrong while creating the flock");
  }

  const feedStock = await FeedStock.create({
    flock: createdFlock._id,
    totalFeedStock: totalFeedStock,
  });

  const createdFeedStock = await FeedStock.findById(feedStock._id);
  if (!createdFeedStock) {
    throw new ApiError(
      500,
      "Something went wrong while creating the feed stock"
    );
  }
  res.status(200).json(
    new ApiResponse(200, "Flock created successfully", {
      createdFlock,
      createdFeedStock,
    })
  );
});
const updateFlock = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    breed,
    totalBirds,
    mortality,
    totalProduction,
    totalFeedStock,
    feedConsumed,
  } = req.body;

  const flock = await Flock.findById(id);
  if (!flock) {
    throw new ApiError(400, "Flock not found");
  }
  if (name) flock.name = name;
  if (breed) flock.breed = breed;
  if (totalBirds) flock.totalBirds = totalBirds;
  if (mortality) flock.mortality = mortality;
  if (totalProduction) flock.totalProduction = totalProduction;
  const updatedFlock = await flock.save();
  if (!updatedFlock) {
    throw new ApiError(500, "Failed to update flock");
  }

  const feedStock = await FeedStock.findOne({ flock: flock._id });
  if (!feedStock) {
    throw new ApiError(404, "Feed Stock not found for that flock");
  }
  if (totalFeedStock) feedStock.totalFeedStock = totalFeedStock;
  if (feedConsumed) feedStock.feedConsumed = feedConsumed;

  const updatedFeedStock = await feedStock.save();
  if (!updatedFeedStock) {
    throw new ApiError(500, "Failed to update the feed Stock");
  }

  res.status(200).json(
    new ApiResponse(200, "Flock updated Successfully", {
      updatedFlock,
      updatedFeedStock,
    })
  );
});
const deleteOneFlock = wrapAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(404, "flock not found of this Id");
  }
  const flock = await Flock.findById(id);
  if (!flock) {
    throw new ApiError(404, "Flock not found of this Id");
  }

  const deletedFlock = await Flock.findByIdAndDelete(flock._id, {
    new: true,
  });

  if (!deletedFlock) {
    throw new ApiError(500, "Something went wrong while deleting the flock ");
  }

  const deletedFeedStock = await FeedStock.findOneAndDelete({
    flock: flock._id,
  });
  if (!deletedFeedStock) {
    throw new ApiError(
      500,
      "Something went wrong while deleting the feed Stock"
    );
  }

  const deletedDailyReport = await DailyReport.deleteMany({
    flock: flock._id,
  });
  if (!deletedDailyReport) {
    throw new ApiError(401, "No daily reports found to delete");
  }
  res.status(200).json(
    new ApiResponse(200, "Flock deleted Successfully", {
      deletedFeedStock,
      deletedFlock,
      deletedDailyReport,
    })
  );
});
const deleteAllFlock = wrapAsync(async (req, res) => {
  const deletedFlocks = await Flock.deleteMany({});
  if (!deletedFlocks) {
    throw new ApiError(500, "Somethig went wrong while deleting the Flocks");
  }
  const deletedFeedStocks = await FeedStock.deleteMany({});
  if (!deletedFeedStocks) {
    throw new ApiError(
      500,
      "Something went wrong while deleting the feed Stock"
    );
  }
  const deletedDailyReport = await DailyReport.deleteMany({});
  if (!deletedDailyReport) {
    throw new ApiError(500, "Falied to delete all daily report of Flock");
  }
  res.status(200).json(
    new ApiResponse(200, "All flocks deleted successfully", {
      deletedFlocks,
      deletedFeedStocks,
      deletedDailyReport,
    })
  );
});
const getAllFlocks = wrapAsync(async (req, res) => {
  const allFlocks = await FeedStock.find({}).populate({
    path: "flock",
  });
  if (!allFlocks) {
    throw new ApiError(404, "No flocks found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Flocks Founs successfully", allFlocks));
});
const getOneFlock = wrapAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(401, "Id not found");
  }
  const flock = await Flock.findById(id);
  if (!flock) {
    throw new ApiError(404, "Flock not found");
  }
  const feedStock = await FeedStock.findOne({ flock: flock._id });
  if (!feedStock) {
    throw new ApiError(404, "Feed Stock not found for this flock");
  }

  const dailyReports = await DailyReport.find({ flock: flock._id });
  if (!dailyReports) {
    throw new ApiError(404, "Reports not found for this flock");
  }
  res.status(200).json(
    new ApiResponse(200, "Flock fetched successfully", {
      flock,
      feedStock,
      dailyReports,
    })
  );
});

export {
  addFlock,
  updateFlock,
  deleteOneFlock,
  deleteAllFlock,
  getAllFlocks,
  getOneFlock,
};
