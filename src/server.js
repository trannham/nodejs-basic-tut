// const express = require("express");
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoute from "./route/web";
import initAPIRoute from "./route/api";
import morgan from "morgan";

// import connection from "./config/connectDB";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;
app.use((req, res, next) => {
  console.log("method use: ", req.method);
  next();
});
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//view engine
configViewEngine(app);

//init web route
initWebRoute(app);

//init api route
initAPIRoute(app);

//handle middleware 404
app.use((req, res) => {
  return res.render("404.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//normal function
// app.listen(port, function () {
//   console.log(`Example app listening on port ${port}`);
// });
