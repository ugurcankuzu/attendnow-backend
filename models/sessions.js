const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  course: { type: mongoose.Types.ObjectId },
  lecturer: { type: mongoose.Types.ObjectId },
  date: { type: Date },
  attendedStudents: { type: Array },
});

module.exports = mongoose.model("Session", SessionSchema);
