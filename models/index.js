"use strict";
const { Sequelize, DataTypes, Op } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {});

const db = {};
db.sequelize = sequelize;
db.Op = Op;

// models
db.itemsModel = require("./items.model")(sequelize, DataTypes);
db.userModel = require("./user.model")(sequelize, DataTypes);
db.commentModel = require("./comment.model")(sequelize, DataTypes);
db.favoriteModel = require("./favorite.model")(sequelize, DataTypes);
db.cartModel = require("./cart.model")(sequelize, DataTypes);

// relation
db.userModel.hasMany(db.itemsModel, { foreignKey: "userId", sourceKey: "id" });
db.itemsModel.belongsTo(db.userModel, {
  foreignKey: "userId",
  targetKey: "id",
});

db.userModel.hasMany(db.commentModel, {
  foreignKey: "userId",
  sourceKey: "id",
});
db.commentModel.belongsTo(db.userModel, {
  foreignKey: "userId",
  targetKey: "id",
});

db.userModel.hasMany(db.favoriteModel, {
  foreignKey: "userId",
  sourceKey: "id",
});
db.favoriteModel.belongsTo(db.userModel, {
  foreignKey: "userId",
  targetKey: "id",
});

db.userModel.hasMany(db.cartModel, {
  foreignKey: "userId",
  sourceKey: "id",
});
db.cartModel.belongsTo(db.userModel, {
  foreignKey: "userId",
  targetKey: "id",
});

db.itemsModel.hasMany(db.commentModel, {
  foreignKey: "itemId",
  sourceKey: "id",
});
db.commentModel.belongsTo(db.itemsModel, {
  foreignKey: "itemId",
  targetKey: "id",
});

db.itemsModel.hasMany(db.favoriteModel, {
  foreignKey: "itemId",
  sourceKey: "id",
});
db.favoriteModel.belongsTo(db.itemsModel, {
  foreignKey: "itemId",
  targetKey: "id",
});

db.itemsModel.hasMany(db.cartModel, {
  foreignKey: "itemId",
  sourceKey: "id",
});
db.cartModel.belongsTo(db.itemsModel, {
  foreignKey: "itemId",
  targetKey: "id",
});

module.exports = db;
