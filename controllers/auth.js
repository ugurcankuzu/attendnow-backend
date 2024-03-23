const Student = require("../models/students");
const ErrorHandler = require("../Middleware/errors/ErrorHandler");
const asyncErrorWrapper = require("express-async-handler");

const register = asyncErrorWrapper( async (req, res, next) => {

    const {name, surname, email, password, confirmpassword} = req.body;

    const student = await Student.create({

        name,
        surname,
        email,
        password,
        confirmpassword
    });

    res.status(200).json({

        success : true,
        data : student
    });
});

module.exports = register;


