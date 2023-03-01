"use strict";
const user = require("../models/index").userModel;

const basicAuth = async (req, res, next) => {
  try {
    const userName = await user.findOne({
      where: { userName: req.body.userName },
    });

    if (userName) {
      return res.status(409).send("username already exist");
    } else {
      const email = await user.findOne({
        where: { email: req.body.email },
      });

      if (email) {
        return res.status(409).send("email already exist");
      } else {
        next();
      }
    }
  } catch (e) {
    next(e.message || e);
  }
};

module.exports = basicAuth;
