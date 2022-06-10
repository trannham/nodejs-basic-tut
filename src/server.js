// const express = require("express");
import express from "express";
import configViewEngine from "./config/viewEngine";

const app = express();
const port = 3000;
const path = require("path");

configViewEngine(app);

app.get("/", (req, res) => {
  res.render("test/index.ejs");
});
app.get("/about", (req, res) => {
  res.send("My name is Tran nham");
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

//normal function
app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
