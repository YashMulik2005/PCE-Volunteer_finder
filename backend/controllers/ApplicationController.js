const Application = require("../models/ApplicationModel");

const addApplication = async (req, res) => {
  try {
    const { event_id, name, mail, mobile } = req.body;
    const user_id = req.user.id;
    const existingApplication = await Application.findOne({
      user_id,
      event_id,
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "User already registered for this event" });
    }
    const application = new Application({
      user_id,
      event_id,
      name,
      mail,
      mobile,
    });
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error adding application", error: err.message });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching application", error: err.message });
  }
};

const getApplicationsByEventId = async (req, res) => {
  try {
    const applications = await Application.find({
      event_id: req.params.eventId,
    }).sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching applications", error: err.message });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(updatedApplication);
  } catch (err) {
    res.status(500).json({
      message: "Error updating application status",
      error: err.message,
    });
  }
};

const getApplicationByUserId = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { status } = req.query;
    let filter = { user_id };

    if (status && status !== "all") {
      filter.status = status;
    }

    const applications = await Application.find(filter).populate(
      "event_id",
      "title eventDate"
    );

    return res.status(200).json({
      status: true,
      message: "Applications data fetched successfully.",
      data: applications,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error while fetching applications.",
      error: err.message,
    });
  }
};

module.exports = {
  addApplication,
  getApplicationById,
  getApplicationsByEventId,
  updateApplicationStatus,
  getApplicationByUserId,
};
