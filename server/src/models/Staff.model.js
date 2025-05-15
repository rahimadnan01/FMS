import mongoose from "mongoose";
const staffSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      user: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Staff = mongoose.model("Staff", staffSchema);
export { Staff };
