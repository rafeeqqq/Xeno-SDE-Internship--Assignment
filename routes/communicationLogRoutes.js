const express = require("express");
const router = express.Router();
const communicationLogController = require("../controllers/communicationLogController.js");

router.post("/", communicationLogController.createCommunicationLog);
router.get("/", communicationLogController.getCommunicationLogs);

module.exports = router;
