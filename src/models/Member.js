const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      default: null,
    },
    points: {
      type: Number,
      default: 0,
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
      },
    ],
    wastedPoints: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
