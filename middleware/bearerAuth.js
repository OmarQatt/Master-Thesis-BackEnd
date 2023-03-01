"use strict";
const { userModel } = require("../models");
// const users = require("../models/user.model");

const bearerAuth = async (req, res, next) => {
  if (!req.headers.authorization) next("You are not authorized");

  const token = req.headers.authorization.split(" ").pop();

  try {
    const validUser = await userModel.authenticateToke(token);
    console.log(validUser);
    const userIfoExist = await userModel.findOne({
      where: { userName: validUser.userName },
    });

    if (userIfoExist) {
      req.user = userIfoExist;
      next();
    } else {
      next("You are not authorized");
    }
  } catch (e) {
    next(e.message || e);
  }
};

module.exports = bearerAuth;
