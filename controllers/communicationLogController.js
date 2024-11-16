const CommunicationLog = require("../models/communicationLog.js");
const Campaign = require("../models/campaign.js");

exports.createCommunicationLog = async (req, res) => {
  try {
    const { campaignId, message, customers } = req.body;
    console.log(customers);
    // Create a new CommunicationLog with multiple customerIds
    const newLog = new CommunicationLog({
      campaignId,
      customerIds: customers, // Array of customer IDs
      message,
    });

    await newLog.save();

    // Simulate delivery status
    const status = Math.random() < 0.9 ? "SENT" : "FAILED";
    console.log(status);
    newLog.status = status;
    await newLog.save();

    // Update the campaign stats based on the status

    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCommunicationLogs = async (req, res) => {
  try {
    const logs = await CommunicationLog.find()
      .populate("campaignId")
      .populate("customerIds");
    res.status(200).json(logs);
  } catch (error) {
    console.error("Error in fetching communication logs:", error);
    res.status(500).json({ message: error.message });
  }
};
