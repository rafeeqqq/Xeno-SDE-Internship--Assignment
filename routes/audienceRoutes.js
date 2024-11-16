const express = require("express");
const router = express.Router();
const { getAudienceSegments } = require("../controllers/audienceController.js");

// Route to fetch audience segments
router.get("/", getAudienceSegments);

module.exports = router;
