const express = require("express");
const verifyJWT = require("../Middleware/jwt/verifyJWT");
const {
  createSession,
  getLecturerById,
} = require("../controllers/lecturerOps");
const router = express.Router();

router.get("/createSession", verifyJWT, createSession);
router.get("/", verifyJWT, getLecturerById);

module.exports = router;
