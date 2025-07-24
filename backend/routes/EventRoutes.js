const express = require("express");
const router = express.Router();
const {
  addEvent,
  getEvents,
  getEventById,
  getEventsByOrganizationId,
} = require("../controllers/EventController");
const { verifyToken } = require("../utils/AuthUtils");

router.post("/add", verifyToken, addEvent);
router.get("/", getEvents);
router.get("/organization/:organizationId", getEventsByOrganizationId);
router.get("/:id", getEventById);

module.exports = router;
