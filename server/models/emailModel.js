const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    to: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
      },
    ],
    subject: { type: String },
    body: { type: String },
    isDraft: { type: Boolean, default: true },
  },
  { timestamps: true }
);

emailSchema.index({ createdAt: -1 });
emailSchema.index({ subject: "text", body: "text" });

module.exports = mongoose.model("Email", emailSchema);
