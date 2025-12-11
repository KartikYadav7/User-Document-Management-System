const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { uploadCSV, listUsers } = require("../controllers/userController");

const csv = "/tmp/uploads/csv";

if (!fs.existsSync(csv)) {
  fs.mkdirSync(csv, { recursive: true });
}

const upload = multer({ dest: csv });
router.post("/upload-csv", upload.single("csv"), uploadCSV);
router.get("/", listUsers);

module.exports = router;
