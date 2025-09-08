const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    org_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    social_links: {
      type: Map, // Object type, can store multiple key-value pairs
      of: String,
    },
    address: {
      type: String,
    },
    org_type: {
      type: String,
      enum: [
        "NGO",
        "Non-Profit",
        "Charity",
        "Trust",
        "Society",
        "Foundation",
        "College",
        "University",
        "School",
        "Club",
        "Sports Club",
        "Community Group",
        "Company",
        "Startup",
        "Corporate",
        "Government",
        "Municipality",
        "Research Institute",
        "Health Organization",
        "Hospital",
        "Environmental Group",
        "Religious Organization",
        "Youth Organization",
        "Cultural Organization",
        "Other",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", organizationSchema);
