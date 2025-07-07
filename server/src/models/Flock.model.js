import mongoose from "mongoose";
const flockSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    breed: {
      type: String,
      required: true,
    },
    totalBirds: {
      type: Number,
      required: true,
    },
    mortality: {
      type: Number,
    },
    remainingBirds: {
      type: Number,
    },
    totalProduction: {
      type: Number,
    },
    percentProduction: {
      type: Number,
    },
    waterIntake: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

flockSchema.pre("save", function (next) {
  this.remainingBirds = this.totalBirds - this.mortality;
  if (this.totalBirds > 0) {
    this.percentProduction = (this.totalProduction / this.totalBirds) * 100;
  } else {
    this.percentProduction = 0;
  }
  next();
});

const Flock = mongoose.model("Flock", flockSchema);
export { Flock };
