
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  message: { type: String },
  assignedPdf: { type: String,
  default: null },
   },
);

module.exports = mongoose.model('User', UserSchema);
