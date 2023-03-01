"use strict";
const express = require("express");
const router = express.Router();
const {
  getUserFavorite,
  createFavorite,
  deleteFavorite,
} = require("../controllers/favoriteController");

router.get("/favorite/:id", getUserFavorite);
router.post("/favorite", createFavorite);
router.delete("/favorite/:id", deleteFavorite);

module.exports = router;
