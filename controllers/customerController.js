const Customer = require("../models/customer.js");
const Campaign = require("../models/campaign.js");

exports.createCustomer = async (req, res) => {
  try {
    const { campaignId, name, email, phone, totalSpending, lastVisit } =
      req.body;

    // Find the campaign by its ID
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res
        .status(400)
        .json({ success: false, message: "Campaign not found" });
    }

    // Create a new customer and link it to the campaign
    const newCustomer = new Customer({
      name,
      email,
      phone,
      totalSpending,
      lastVisit,
      campaignId: campaign._id,
    });

    // Save the new customer
    await newCustomer.save();

    // Update the campaign with new total spending and visits
    campaign.totalSpending += totalSpending;
    campaign.audienceSize += 1; // Increment audience size
    await campaign.save();

    res.status(201).json({
      success: true,
      message: "Customer added successfully",
      customer: newCustomer,
      updatedCampaign: campaign,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().populate("campaignId");
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
