const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoursesSchema = new Schema({
  courseName: { type: String },
  lecturerId: { type: mongoose.Types.ObjectId, ref: "Lecturer" },
});

module.exports = mongoose.model("Course", CoursesSchema);
