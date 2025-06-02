import mongoose, { mongo } from "mongoose";
const feedStockSchema = new mongoose.Schema(
  {
    flock: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "Flock",
    },
    totalFeedStock: {
      type: Number,
    },
    feedConsumed: {
      type: Number,
    },
    remainingFeed: {
      type: Number,
    },
  },
  { timestamps: true }
);

feedStockSchema.pre("save", function (next) {
  if (this.totalFeedStock > 0) {
    this.remainingFeed = this.totalFeedStock - this.feedConsumed;
  } else {
    this.remainingFeed = 0;
  }
  next();
});

const FeedStock = mongoose.model("FeedStock", feedStockSchema);
export { FeedStock };
