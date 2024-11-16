const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    audienceSize: { type: Number, default: 0 },
    totalSpending: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", CampaignSchema);
