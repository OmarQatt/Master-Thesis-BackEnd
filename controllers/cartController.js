"use strict";
const { cartModel, userModel, itemsModel } = require("../models/index");

const getUserCart = async (req, res) => {
  try {
    const excludedAttributes = [
      "password",
      "email",
      "role",
      "createdAt",
      "updatedAt",
      "token",
    ];
    const carts = await cartModel.findAll({
      where: { userId: req.params.id },
      include: [
        {
          model: itemsModel,
          include: [
            { model: userModel, attributes: { exclude: excludedAttributes } },
          ],
        },
      ],
    });
    //   where: { userId: req.params.id },
    //   include: [
    //     {
    //       model: itemsModel,
    //       include: [
    //         { model: userModel, attributes: { exclude: excludedAttributes } },
    //       ],
    //     },
    //   ],
    // });
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addItemToCart = async (req, res) => {
  try {
    const createCart = await cartModel.create(req.body);
    res.status(201).json(createCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteItemFromCart = async (req, res) => {
  try {
    const deleteCart = await cartModel.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(deleteCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getUserCart,
  addItemToCart,
  deleteItemFromCart,
};
