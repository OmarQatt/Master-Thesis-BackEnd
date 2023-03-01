"use strict";
const express = require("express");
const router = express.Router();
const basicAuth = require("../middleware/basicAuth");
const bearerAuth = require("../middleware/bearerAuth");
const {
  signup,
  login,
  getAllUsers,
  getUserById,
} = require("../controllers/userController");

router.post("/signup", basicAuth, signup);
router.post("/login", login);
router.get("/users", bearerAuth, getAllUsers);
router.get("/users/:id", bearerAuth, getUserById);

module.exports = router;
