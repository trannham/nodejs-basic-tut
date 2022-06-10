const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World! Learning ExpressJS");
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
