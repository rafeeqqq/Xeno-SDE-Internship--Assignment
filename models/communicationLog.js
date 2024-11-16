const mongoose = require("mongoose");

const CommunicationLogSchema = new mongoose.Schema(
  {
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    customerIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
      },
    ],
    message: { type: String, required: true },
    status: { type: String, enum: ["SENT", "FAILED"], default: "SENT" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CommunicationLog", CommunicationLogSchema);
