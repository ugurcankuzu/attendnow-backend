const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const bcrypt = require("bcryptjs");
const LecturerSchema = new Schema({
  name: {
    type: String,
    required: [true, "Lütfen isminizi giriniz"],
  },

  surname: {
    type: String,
    required: [true, "Lütfen soyisminizi giriniz"],
  },

  email: {
    type: String,
    required: [true, "Lütfen emailinizi giriniz"],
    unique: true,
    match: [emailRegex, "Lütfen geçerli bir email giriniz."],
  },

  password: {
    type: String,
    minlength: [8, "Şifreniz en az 8 karakterden oluşmalıdır."],
    required: [true, "Lütfen şifrenizi belirleyiniz."],
    select: false,
  },
  courses: {
    type: Array,
    ref: "Course",
  },
  sessions: {
    type: Array,
    ref: "Session",
  },
  activeSession: {
    type: mongoose.Types.ObjectId,
    ref: "Session",
    default: null,
  },
});

LecturerSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});
module.exports = mongoose.model("Lecturer", LecturerSchema);
