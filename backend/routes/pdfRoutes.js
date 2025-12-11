const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  uploadOrCreatePDF,
  assignPDF,
  downloadZIP
} = require("../controllers/pdfController");

// SIMPLE MULTER STORAGE (no middleware file)
const uploadDir = "/tmp/pdfs";

// Create folder if not exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "pdfs/"); // folder must exist
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".pdf";
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

// Route: upload or create PDF
router.post(
  "/create-or-upload",
  upload.single("pdfFile"),
  uploadOrCreatePDF
);

router.post("/assign", assignPDF);
router.post("/download-zip", downloadZIP);

module.exports = router;
