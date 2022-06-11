import pool from "../config/connectDB";

let getAllUsers = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM users");
  return res.status(200).json({
    message: "ok",
    data: rows,
  });
};

let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;

  if (!firstName || !lastName || !email || !address) {
    return res.status(200).json({
      message: "missing input",
    });
  }

  await pool.execute(
    "INSERT INTO users(firstName, lastName, email, address) VALUES (?, ?, ?, ?)",
    [firstName, lastName, email, address]
  );

  return res.status(200).json({
    message: "ok",
  });
};

let editUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;

  if (!firstName || !lastName || !email || !address || !id) {
    return res.status(200).json({
      message: "missing input",
    });
  }

  await pool.execute(
    "UPDATE users set firstName= ?, lastName= ?, email= ?, address= ? WHERE id= ?",
    [firstName, lastName, email, address, id]
  );

  return res.status(200).json({
    message: "ok",
  });
};

let deleteUser = async (req, res) => {
  let userId = req.params.userId;

  if (!userId) {
    return res.status(200).json({
      message: "missing params",
    });
  }

  await pool.execute("DELETE FROM users WHERE id = ?", [userId]);
  return res.status(200).json({
    message: "ok",
  });
};

module.exports = {
  getAllUsers,
  createNewUser,
  editUser,
  deleteUser,
};
