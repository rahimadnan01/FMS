import mongoose, { mongo } from "mongoose";
const monthlyReportSchema = new mongoose.Schema(
  {
    flock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flock",
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    totalMortality: {
      type: Number,
      default: 0,
    },
    totalFeedConsumed: {
      type: Number,
      default: 0,
    },
    totalEggsCollected: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const MonthlyReport = mongoose.model(
  "MonthlyReport",
  monthlyReportSchema
);
