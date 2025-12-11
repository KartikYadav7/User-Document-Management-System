
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const app = express();
connectDB();

app.use(cors({
    origin: ['http://localhost:5173',],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static folders for generated files
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/pdf", require("./routes/pdfRoutes"));

// STATIC FILES (PDFs + ZIP)
app.use("/pdfs", express.static("pdfs"));
app.use("/downloads", express.static("downloads"));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));