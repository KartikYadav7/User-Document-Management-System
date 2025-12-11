const User = require("../models/User");
const csv = require("csv-parser");
const fs = require("fs");

exports.uploadCSV = async (req, res) => {
  try {
    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => results.push(row))
      .on("end", async () => {
        const inserted = await User.insertMany(results);
        res.json({ users: inserted });
      });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
