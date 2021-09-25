import mongoose from "mongoose";
const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    username: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["task", "hobby", "work"],
      default: "task",
    },
  },
  { timestamps: true }
);
export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
