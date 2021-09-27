// const express = require("express");
// const mongoose = require("mongoose");
import express from "express";
import mongoose from "mongoose";
import { errorHandler } from "./middlewares/errors";

// const env = require("dotenv");
import env from "dotenv";
env.config();

import todoRoute from "./route/todoRoute.js";
import authRoute from "./route/authRoute.js";

const app = express();

app.use(express.json());

app.get("/", function (req, res) {
  res.send(" <h1> home Page </h1>");
  // res.render("home");
});

app.use("/todo", todoRoute);
app.use("/auth", authRoute);

// DB conection
mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
});
mongoose.connection
  .once("open", function () {
    console.log("Connected to Mongo");
  })
  .on("error", function (err) {
    console.log("Mongo Error", err);
  });

// app.use(notFound);
app.use(errorHandler);

app.listen(3001, () => {
  console.log("Server is up and running at the port 3001");
});
