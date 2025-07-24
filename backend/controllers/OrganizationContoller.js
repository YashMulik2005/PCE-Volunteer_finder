const Organization = require("../models/OrganizationModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const signup = async (req, res) => {
  try {
    const { org_name, mail, password, mobile_no } = req.body;
    if (!org_name || !mail || !password || !mobile_no) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }
    const existingOrg = await Organization.findOne({ mail });
    if (existingOrg) {
      return res
        .status(400)
        .json({ status: false, message: "Organization already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const org = new Organization({
      org_name,
      mail,
      password: hashedPassword,
      mobile_no,
    });
    await org.save();
    const token = jwt.sign({ id: org._id }, JWT_SECRET, { expiresIn: "1d" });
    res.status(201).json({
      status: true,
      token,
      organization: {
        id: org._id,
        org_name: org.org_name,
        mail: org.mail,
        mobile_no: org.mobile_no,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ staus: true, message: "Server error", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { mail, password } = req.body;
    if (!mail || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }
    const org = await Organization.findOne({ mail });
    if (!org) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, org.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ orgId: org._id, name: org.org_name }, JWT_SECRET);
    res.status(200).json({
      satus: true,
      token,
      organization: {
        id: org._id,
        org_name: org.org_name,
        mail: org.mail,
        mobile_no: org.mobile_no,
        type: "organization",
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "Server error", error: err.message });
  }
};

module.exports = { signup, login };
