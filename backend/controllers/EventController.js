const Event = require("../models/EventModel");

const addEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      eventDate,
      eventTime,
      duration,
      volunteersRequired,
      registrationDeadline,
      contact,
      type,
    } = req.body;

    const event = new Event({
      title,
      description,
      organization: req.user.orgId,
      location,
      eventDate,
      eventTime,
      duration,
      volunteersRequired,
      registrationDeadline,
      contact,
      type,
    });

    await event.save();
    res
      .status(201)
      .json({ status: true, data: event, message: "Event added sucessfully." });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: "Error adding event",
      error: err.message,
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("organization");
    res.status(200).json({
      status: true,
      data: events,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching events", error: err.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "organization",
      "org_name mail mobile_no"
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({
      status: true,
      data: event,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching event", error: err.message });
  }
};

const getEventsByOrganizationId = async (req, res) => {
  try {
    const orgId = req.params.organizationId;
    const events = await Event.find({ organization: orgId }).populate(
      "organization"
    );
    res.status(200).json({ status: true, data: events });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error fetching events",
      error: err.message,
    });
  }
};

module.exports = {
  addEvent,
  getEvents,
  getEventById,
  getEventsByOrganizationId,
};
