const error = require("../../error/error");
const ErrorHandler = (err, req, res, next ) => {

    let _error = err;

    if (err.name === "SyntaxError") {

        _error = new error("Unexpected Syntax", 400);
    }
    if (err.name === "ValidationError") {

        _error = new error(err.message, 400);
    }
    if (err.code === 11000) {

        _error = new error("Bu e-posta daha önce kullanılmış",400);
    }
    

    res.status(_error.status || 500).json({

        success : false,
        message : _error.message || "Internal Server Error"
    });
};

module.exports = ErrorHandler;