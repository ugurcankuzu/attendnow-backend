const express = require("express");
const verifyJWT = require("../Middleware/jwt/verifyJWT");
const { createSession } = require("../controllers/lecturerOps");
const router = express.Router();

router.get("/createSession", verifyJWT, createSession);

module.exports = router;
