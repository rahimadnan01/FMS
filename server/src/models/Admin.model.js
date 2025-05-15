import mongoose from "mongoose";
const adminSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
export { Admin };
