const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaignController.js");

router.post("/", campaignController.createCampaign);
router.get("/", campaignController.getCampaigns);

module.exports = router;
