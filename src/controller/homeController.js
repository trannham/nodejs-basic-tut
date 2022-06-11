import connection from "../config/connectDB";

let getHomepage = (req, res) => {
  //logic
  let data = [];
  connection.query("SELECT * FROM `users` ", function (err, results, fields) {
    console.log(">> check mysql");
    console.log(results); // results contains rows returned by server
    data = results.map((row) => {
      return row;
    });
    console.log(JSON.stringify(data));
    return res.render("index.ejs", { dataUser: JSON.stringify(data) });
  });
};

module.exports = {
  getHomepage,
};
