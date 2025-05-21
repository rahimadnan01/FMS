import { Flock } from "../models/Flock.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { FeedStock } from "../models/FeedStock.model.js";
const addFlock = wrapAsync(async (req, res) => {
  const {
    name,
    breed,
    totalBirds,
    mortality,
    totalProduction,
    totalFeedStock,
    feedConsumed,
  } = req.body;
  if (
    !name ||
    !breed ||
    !totalBirds ||
    !mortality ||
    !totalProduction ||
    !totalFeedStock ||
    !feedConsumed
  ) {
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
    mortality: mortality,
    totalProduction: totalProduction,
  });
  const createdFlock = await Flock.findById(flock._id);
  if (!createdFlock) {
    throw new ApiError(500, "Something went wrong while creating the flock");
  }

  const feedStock = await FeedStock.create({
    flock: createdFlock._id,
    totalFeedStock: totalFeedStock,
    feedConsumed: feedConsumed,
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
  if (updatedFlock) {
    throw new ApiError(500, "Failed to update flock");
  }

  const feedStock = await FeedStock.findOne({ flock: flock._id });
  if (!feedStock) {
    throw new ApiError(404, "Feed Stock not found for that flock");
  }
  if (totalFeedStock) feedStock.totalFeedStock = totalFeedStock;
  if (feedConsumed) feedStock.feedConsumed = feedConsumed;

  const updatedFeedStock = await feedStock.save();
  if (updatedFeedStock) {
    throw new ApiError(500, "Failed to update the feed Stock");
  }

  res.status(200).json(
    new ApiResponse(200, "Flock updated Successfully", {
      updatedFlock,
      updatedFeedStock,
    })
  );
});

export { addFlock, updateFlock };
