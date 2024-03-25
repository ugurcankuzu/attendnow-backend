const asyncErrorWrapper = require("express-async-handler");
const Lecturer = require("../models/lecturer");
const bcrypt = require("bcryptjs");
const createJWT = require("../Middleware/jwt/createJWT");

const register = asyncErrorWrapper(async (req, res, next) => {
  const { name, surname, email, password, confirmpassword } = req.body;

  if (password === confirmpassword) {
    const lecturer = await Lecturer.create({
      name,
      surname,
      email,
      password,
      confirmpassword,
    });

    res.status(200).json({
      success: true,
      data: lecturer,
    });
  } else {
    next(new Error("Password ve Confirm Password Eşleşmiyor."));
  }
});

const login = asyncErrorWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    const lecturer = await Lecturer.findOne({ email: email }).select(
      "password"
    );

    const compareResult = await bcrypt.compare(password, lecturer.password);
    if (compareResult) {
      const payload = {
        id: lecturer._id,
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
