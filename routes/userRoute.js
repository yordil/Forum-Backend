const express = require("express");
const { register, login, checkUser } = require("../Controller/userController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// register route
router.post("/register", register);
// login route
router.post("/login", login);

// check user
router.get("/check", authMiddleware, checkUser);

module.exports = router;
