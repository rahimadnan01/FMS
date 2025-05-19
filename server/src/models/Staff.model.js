import mongoose from "mongoose";
const staffSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Staff = mongoose.model("Staff", staffSchema);
export { Staff };
