// const express = require("express");
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoute from "./route/web";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

//view engine
configViewEngine(app);

//init web route
initWebRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//normal function
// app.listen(port, function () {
//   console.log(`Example app listening on port ${port}`);
// });
