"use strict";
const { commentModel } = require("../models/index");

const createComment = async (req, res) => {
  try {
    const comment = await commentModel.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateComment = async (req, res) => {
  try {
    const comment = await commentModel.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await commentModel.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
