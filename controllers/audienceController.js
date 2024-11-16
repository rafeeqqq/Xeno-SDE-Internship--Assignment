const Customer = require("../models/customer.js");

// Fetch audience segments based on customer spending with dynamic thresholds
const getAudienceSegments = async (req, res) => {
  try {
    // Fetch thresholds from query parameters (with default values)
    const lowSpenderThreshold = parseFloat(req.query.low || 500);
    const highSpenderThreshold = parseFloat(req.query.high || 500);

    // First, fetch all customers
    const customers = await Customer.find();

    // Group customers based on spending thresholds
    const lowSpenders = customers.filter(
      (customer) => customer.totalSpending < lowSpenderThreshold
    );
    const highSpenders = customers.filter(
      (customer) => customer.totalSpending >= highSpenderThreshold
    );

    // Create the segments
    const segments = [
      {
        name: "Low Spenders",
        size: lowSpenders.length,
        customers: lowSpenders,
      },
      {
        name: "High Spenders",
        size: highSpenders.length,
        customers: highSpenders,
      },
    ];

    // Return the segments along with the customer data
    res.status(200).json(segments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAudienceSegments,
};
