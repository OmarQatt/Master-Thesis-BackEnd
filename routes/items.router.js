"use strict";
const express = require("express");
const router = express.Router();
const uploadImageItems = require("../middleware/uploadImageItems");
const {
  getAllItems,
  getOneItems,
  createItems,
  updateItems,
  deleteItems,
  getItemsByCategory,
} = require("../controllers/itemsController");
const acl = require("../middleware/acl");
const bearerAuth = require("../middleware/bearerAuth");

router.get("/items", getAllItems);
router.get("/items/:id", getOneItems);
router.post("/items", uploadImageItems, createItems);
router.put("/items/:id", uploadImageItems, bearerAuth, acl, updateItems);
router.delete("/items/:id", bearerAuth, acl, deleteItems);
router.get("/items/:category", getItemsByCategory);

module.exports = router;
