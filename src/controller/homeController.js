import pool from "../config/connectDB";
import multer from "multer";

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

let getUploadpage = async (req, res) => {
  return res.render("uploadFile.ejs");
};

let handleUploadFile = async (req, res) => {
  console.log(req.file);
  // req.file contains information of uploaded file
  // req.body contains information of text fields, if there were any

  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.file) {
    return res.send("Please select an image to upload");
  }

  // Display uploaded image for user validation
  res.send(
    `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
  );
};

let handleUploadMultipleFiles = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.files) {
    return res.send("Please select an image to upload");
  }

  let result = "You have uploaded these images: <hr />";
  const files = req.files;
  let index, len;

  // Loop through all the uploaded images and display them on frontend
  for (index = 0, len = files.length; index < len; ++index) {
    result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
  }
  result += '<hr/><a href="/upload">Upload more images</a>';
  res.send(result);
};

module.exports = {
  getHomepage,
  getDetailpage,
  createNewUser,
  deleteUser,
  getEditpage,
  updateUser,
  getUploadpage,
  handleUploadFile,
  handleUploadMultipleFiles,
};
