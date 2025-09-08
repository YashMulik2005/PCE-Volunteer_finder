const express = require("express");
const router = express.Router();
const {
  addApplication,
  getApplicationById,
  getApplicationsByEventId,
  updateApplicationStatus,
  getApplicationByUserId,
} = require("../controllers/ApplicationController.js");
const { verifyToken } = require("../utils/AuthUtils");

router.post("/add", verifyToken, addApplication);

router.get("/myApplication", verifyToken, getApplicationByUserId);
router.get("/event/:eventId", getApplicationsByEventId);

router.get("/:id", getApplicationById);

router.put("/status/:id", verifyToken, updateApplicationStatus);

module.exports = router;
