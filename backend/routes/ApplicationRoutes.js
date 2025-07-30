const express = require("express");
const router = express.Router();
const {
  addApplication,
  getApplicationById,
  getApplicationsByEventId,
  updateApplicationStatus,
} = require("../controllers/ApplicationController.js");
const { verifyToken } = require("../utils/AuthUtils");

router.post("/add", verifyToken, addApplication);
router.get("/:id", getApplicationById);
router.get("/event/:eventId", getApplicationsByEventId);
router.put("/status/:id", verifyToken, updateApplicationStatus);

module.exports = router;
