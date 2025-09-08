const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  completeProfile,
  getProfile,
  profileChange,
} = require("../controllers/UserController");
const { verifyToken } = require("../utils/AuthUtils");

router.post("/signup", signup);
router.post("/login", login);
router.put("/update-profile", verifyToken, completeProfile);
router.put("/updateProfileImage", verifyToken, profileChange);
router.get("/profile", verifyToken, getProfile);

module.exports = router;
