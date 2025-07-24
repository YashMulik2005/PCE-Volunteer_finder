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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", eventSchema);
