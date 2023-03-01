"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const itemsRouter = require("./routes/items.router");
const userRouter = require("./routes/user.router");
const favoriteRouter = require("./routes/favorite.router");
const cartRouter = require("./routes/cart.router");
const commentRouter = require("./routes/comment.router");
const handlNotFound = require("./error-handlers/404");
const handlError = require("./error-handlers/500");

app.use(cors());
app.use(express.json());
app.use(itemsRouter);
app.use(userRouter);
app.use(favoriteRouter);
app.use(cartRouter);
app.use(commentRouter);
app.use(express.static("ImageItems"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

function startServer(port) {
  app.listen(port, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`Server is running on port ${port}`);
  });
}

app.use("*", handlNotFound);
app.use(handlError);
module.exports = { startServer, app };
