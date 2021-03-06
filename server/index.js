"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//route handlers
const {
  getItems,
  getCompany,
  getCompanies,
  getItem,
  signIn,
  signUp,
  addItemToCart,
  buyItem,
  deleteItemFromCart,
} = require("./handlers");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // ====================REST endpoints===================
  .post("/api/signin", signIn)
  .post("/api/signup", signUp)

  .get("/api/items", getItems)
  .get("/api/item/:id", getItem)
  .get("/api/companies", getCompanies)
  .get("/api/company/:id", getCompany)

  .post("/api/purchase", buyItem)
  .post("/api/cart", addItemToCart)
  .delete("/api/cart", deleteItemFromCart)

  //========================================================

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
