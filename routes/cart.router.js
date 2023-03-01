"use strict";
const express = require("express");
const router = express.Router();
const {
  getUserCart,
  addItemToCart,
  deleteItemFromCart,
} = require("../controllers/cartController");

router.get("/cart/:id", getUserCart);
router.post("/cart", addItemToCart);
router.delete("/cart/:id", deleteItemFromCart);

module.exports = router;
