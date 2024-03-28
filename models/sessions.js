const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  course: { type: mongoose.Types.ObjectId, ref: "Course" },
  lecturer: { type: mongoose.Types.ObjectId, ref: "Lecturer" },
  date: { type: Date },
  attendedStudents: { type: Array, ref: "Student" },
});

module.exports = mongoose.model("Session", SessionSchema);
