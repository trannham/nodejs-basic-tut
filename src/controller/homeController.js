import pool from "../config/connectDB";

let getHomepage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  return res.render("index.ejs", {
    dataUser: rows,
    test: "text input with EJS",
  });

  //   let data = [];
  //   connection.query("SELECT * FROM `users` ", function (err, results, fields) {
  //     data = results.map((row) => {
  //       data.push({
  //         id: row.id,
  //         firstName: row.firstName,
  //         lastName: row.lastName,
  //         email: row.email,
  //         address: row.address,
  //       });
  //     });
  //     console.log(JSON.stringify(data));
  //   });
};

let getDetailpage = async (req, res) => {
  let id = req.params.userId;
  let [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
  console.log(req.params);
  console.log(user);
  return res.send(user[0]);
};

let createNewUser = async (req, res) => {
  console.log(req.body);
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "INSERT INTO users(firstName, lastName, email, address) VALUES (?, ?, ?, ?)",
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};

let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute("DELETE FROM users WHERE id = ?", [userId]);
  return res.send(`User ${req.body.userId} has been deleted.`);
};

let getEditpage = async (req, res) => {
  let id = req.params.userId;
  let [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
  return res.render("editUser.ejs", {
    dataUser: user[0],
  });
};

let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  await pool.execute(
    "UPDATE users set firstName= ?, lastName= ?, email= ?, address= ? WHERE id= ?",
    [firstName, lastName, email, address, id]
  );
  return res.redirect("/");
};

module.exports = {
  getHomepage,
  getDetailpage,
  createNewUser,
  deleteUser,
  getEditpage,
  updateUser,
};
