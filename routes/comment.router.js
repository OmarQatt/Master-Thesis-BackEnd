"use strict";
const express = require("express");
const router = express.Router();
const {
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

router.post("/comment", createComment);
router.put("/comment/:id", updateComment);
router.delete("/comment/:id", deleteComment);

module.exports = router;
