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
      default: 0,
    },
    remainingBirds: {
      type: Number,
    },
    totalProduction: {
      type: Number,
      default: 0,
    },
    percentProduction: {
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
  if (this.totalBirds > 100) {
    this.percentProduction = (this.totalProduction / this.totalBirds) * 100;
  } else {
    this.percentProduction = 0;
  }
  next();
});

const Flock = mongoose.model("Flock", flockSchema);
export { Flock };
