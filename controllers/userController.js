"use strict";
const user = require("../models/index").userModel;
const base64 = require("base-64");
const bcrypt = require("bcrypt");
const Op = require("sequelize").Op;

const signup = async (req, res) => {
  try {
    const data = {
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    };
    const newUser = await user.create(data);

    if (newUser) {
      res.status(201).json(newUser);
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const login = async (req, res) => {
  try {
    const basicHeader = req.headers.authorization.split(" ");
    const decodedValue = basicHeader.pop();
    const decoded = base64.decode(decodedValue);
    const [loginInfo, password] = decoded.split(":");
    const userById = await user.findOne({
      where: { [Op.or]: [{ email: loginInfo }, { userName: loginInfo }] },
    });

    if (userById) {
      const valid = await bcrypt.compare(password, userById.password);

      if (valid) {
        res.status(200).json(userById);
      } else {
        res.status(403).send("Emial or Password is wrong Please try again");
      }
    } else {
      res.status(403).send("Emial or Password is wrong Please try again");
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await user.findAll();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const userById = await user.findOne({ where: { id: req.params.id } });
    res.status(200).json(userById);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

module.exports = { signup, login, getAllUsers, getUserById };
