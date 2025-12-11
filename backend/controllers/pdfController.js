const fs = require("fs");
const PDFDocument = require("pdfkit");
const path = require("path");
const AdmZip = require("adm-zip");
const User = require("../models/User");
const nodemailer = require("nodemailer");

exports.uploadOrCreatePDF = async (req, res) => {
  try {
    let pdfPath = "";

    // 1) If user UPLOADED a PDF file
    if (req.file) {
      pdfPath = "pdfs/" + req.file.filename;
    }

    // 2) If user CHOSE to create one
    else if (req.body.title) {
      const filename = Date.now() + ".pdf";
      pdfPath = "pdfs/" + filename;

      const doc = new PDFDocument();
      doc.pipe(fs.createWriteStream(pdfPath));
      doc.fontSize(20).text(req.body.title, 50, 50);
      doc.end();
    }

    // 3) If nothing provided → error
    else {
      return res.status(400).json({
        message: "Please upload a PDF or enter title to create one.",
      });
    }

    return res.json({ pdfPath });

  } catch (err) {
    console.error("PDF error:", err);
    res.status(500).json({ error: err.message });
  }
};
exports.assignPDF = async (req, res) => {
  try {
    const { users, pdfPath } = req.body;

    if (!users || users.length === 0)
      return res.status(400).json({ message: "No users selected" });

    if (!pdfPath)
      return res.status(400).json({ message: "No PDF provided" });

    const userList = await User.find({ _id: { $in: users } });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const pdfFullPath = path.join(__dirname, "..", pdfPath);

    // 1) Send emails
    for (let user of userList) {
      await transporter.sendMail({
        from: `"Document Service" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Your Assigned PDF Document",
        text: `Hi ${user.name},

Please find your assigned PDF document attached.

Regards,
Admin`,
        attachments: [
          {
            filename: path.basename(pdfPath),
            path: pdfFullPath,
          },
        ],
      });
    }

    // 2) Save PDF link to assigned users
    await User.updateMany(
      { _id: { $in: users } },
      { $set: { assignedPdf: pdfPath } }
    );


    return res.json({
      message: "PDF assigned, emailed, and database updated successfully!",
    });

  } catch (err) {
    console.error("Assign PDF Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.downloadZIP = (req, res) => {
  const zip = new AdmZip();
  const folder = "pdfs";

  fs.readdirSync(folder).forEach(file => {
    zip.addLocalFile(path.join(folder, file));
  });

  const zipPath = "downloads/pdfs.zip";
  zip.writeZip(zipPath);

  res.download(zipPath);
};
