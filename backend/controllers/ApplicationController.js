const Application = require("../models/ApplicationModel");

const addApplication = async (req, res) => {
  try {
    const { user_id, event_id, name, mail, mobile } = req.body;
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
    });
    res.status(200).json(applications);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching applications", error: err.message });
  }
};

module.exports = {
  addApplication,
  getApplicationById,
  getApplicationsByEventId,
};
