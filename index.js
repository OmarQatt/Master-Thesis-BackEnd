"use strict";
const { startServer } = require("./server");
require("dotenv").config();
const db = require("./models/index");

db.sequelize.sync().then(() => {
  startServer(process.env.PORT);
});

// db.sequelize.sync({ force: true }).then(() => {
//   startServer(process.env.PORT);
// });
