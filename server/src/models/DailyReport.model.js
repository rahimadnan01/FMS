import mongoose from "mongoose";
const dailyReportSchema = new mongoose.Schema(
  {
    flock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flock",
    },
    mortality: {
      type: Number,
      default: 0,
    },
    feedConsumed: {
      type: Number,
      default: 0,
    },
    Date: {
      type: Date,
      default: Date.now,
    },
    eggsCollected: {
      type: Number,
      default: 0,
    },
    waterIntake: {
      type: Number,
      default: 0,
    },
    minTemp: {
      type: Number,
      default: 0,
    },
    maxTemp: {
      type: Number,
      default: 0,
    },
    medicine: {
      type: String,
      default: "",
    },
    eggWeight: {
      type: Number,
      default: 0,
    },
    birdAge: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const DailyReport = mongoose.model("DailyReport", dailyReportSchema);
export { DailyReport };
