const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  location: {
    address: { type: String, required: true },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  eventDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: String,
  },
  volunteersRequired: {
    type: Number,
    required: true,
  },
  eventTime: {
    type: String,
    required: true,
  },
  registrationDeadline: {
    type: Date,
    required: true,
  },
  contact: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "Fundraiser",
      "Clean-up",
      "Workshop",
      "Campaign",
      "Awareness Drive",
      "Other",
    ],
    default: "Other",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", eventSchema);
