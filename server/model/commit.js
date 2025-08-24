import mongoose from "mongoose";

const commitSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Commit = mongoose.model("Commit", commitSchema);

export default Commit;
