"use strict";
// just a simple middleware to check if the user have capability to access the route or he owner the items

const { itemsModel } = require("../models/index");

const acl = async (req, res, next) => {
  const id = req.params.id;
  const item = await itemsModel.findOne({ where: { id: id } });
  console.log(item.userId, req.user.id, req.user.role);
  if (item.userId === req.user.id) {
    next();
  } else {
    next("you don't have permission to access this route");
  }
};

module.exports = acl;
