"use strict";
const { itemsModel, commentModel, userModel } = require("../models/index");
const fs = require("fs");
const path = require("path");

// function getAllItems whare include userModel and commentModel with all data in commentModel
const excludedAttributes = [
  "password",
  "email",
  "role",
  "createdAt",
  "updatedAt",
  "token",
];
const getAllItems = async (req, res) => {
  try {
    const items = await itemsModel.findAll({
      include: [
        { model: userModel, attributes: { exclude: excludedAttributes } },
      ],
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json(error);
  }
};

// function getOneItems whare include commentModel and userModel
const getOneItems = async (req, res) => {
  try {
    const items = await itemsModel.findOne({
      where: { id: req.params.id },
      include: [
        { model: userModel, attributes: { exclude: excludedAttributes } },
        { model: commentModel, include: [userModel] },
      ],
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json(error);
  }
};

// function createItems
const createItems = async (req, res) => {
  try {
    // get images
    const images = [];
    for (let i = 0; i < req.files.length; i++) {
      images.push(req.files[i].path);
    }
    // create items
    const items = await itemsModel.create({
      ...req.body,
      itemImage: images,
    });
    res.status(201).json(items);
  } catch (error) {
    // loop ro delete images if error
    for (let i = 0; i < req.files.length; i++) {
      fs.unlinkSync(req.files[i].path);
    }
    res.status(500).json(error);
  }
};

// function updateItems
const updateItems = async (req, res) => {
  try {
    const items = await itemsModel.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json(error);
  }
};

// function deleteItems
const deleteItems = async (req, res) => {
  try {
    // delete images
    const items = await itemsModel.findOne({
      where: { id: req.params.id },
    });
    if (!items.itemImage[0].startsWith("http")) {
      for (let i = 0; i < items.itemImage.length; i++) {
        fs.unlinkSync(path.join(__dirname, "..", items.itemImage[i]));
      }
    }
    // delete items
    const itemsDelete = await itemsModel.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(itemsDelete);
  } catch (error) {
    res.status(500).json(error);
  }
};

// function getItemsByCategory
const getItemsByCategory = async (req, res) => {
  try {
    const items = await itemsModel.findAll({
      where: { category: req.params.category },
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllItems,
  getOneItems,
  createItems,
  updateItems,
  deleteItems,
  getItemsByCategory,
};
