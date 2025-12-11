const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/csv/" });
const { uploadCSV, listUsers } = require("../controllers/userController");

router.post("/upload-csv", upload.single("csv"), uploadCSV);
router.get("/", listUsers);

module.exports = router;
