import mongoose from "mongoose";
const weekleReportSchema = new mongoose.Schema(
  {
    flock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flcok",
    },
    weekStartDate: {
      type: Date,
      required: true,
    },
    weekEndDate: {
      type: Date,
      required: true,
    },
    totalMortality: {
      type: Number,
      default: 0,
    },
    totalEggsCollected: {
      type: Number,
      default: 0,
    },
    totalFeedConsumed: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const WeeklyReport = mongoose.model("WeeklyReport", weekleReportSchema);
export { WeeklyReport };
