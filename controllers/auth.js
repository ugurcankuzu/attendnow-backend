const Student = require("../models/students");
const createJWT = require("../Middleware/jwt/createJWT");
const ErrorHandler = require("../Middleware/errors/ErrorHandler");
const asyncErrorWrapper = require("express-async-handler");
const bcrypt = require("bcryptjs");
const register = asyncErrorWrapper(async (req, res, next) => {
  const { name, surname, email, password, confirmpassword } = req.body;

  if (password === confirmpassword) {
    const student = await Student.create({
      name,
      surname,
      email,
      password,
      confirmpassword,
    });

    res.status(200).json({
      success: true,
      data: student,
    });
  } else {
    next(new Error("Password ve Confirm Password Eşleşmiyor."));
  }
});

const login = asyncErrorWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    const student = await Student.findOne({ email: email }).select("password");

    const compareResult = await bcrypt.compare(password, student.password);
    if (compareResult) {
      const payload = {
        id: student._id,
      };
      const jwtToken = createJWT(payload);
      res.status(200).send(jwtToken);
    } else {
      return next(new Error("Email ya da şifre hatalı!"));
    }
  } else {
    next(new Error("Lütfen Email ve Passwordun dolu olduğuna emin olun."));
  }
});
module.exports = { register, login };
