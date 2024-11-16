const Campaign = require("../models/campaign");

// Create a Campaign
exports.createCampaign = async (req, res) => {
  try {
    const {
      name,
      description,
      startDate,
      endDate,
      audienceSize,
      totalSpending,
    } = req.body;

    // Create a new campaign with the provided data
    const newCampaign = new Campaign({
      name,
      description,
      startDate,
      endDate,
      audienceSize,
      totalSpending,
    });

    await newCampaign.save();
    res.status(201).json({ success: true, campaign: newCampaign });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Campaigns
exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json({ success: true, campaigns });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
