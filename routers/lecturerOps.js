const express = require("express");
const verifyJWT = require("../Middleware/jwt/verifyJWT");
const {
  createSession,
  getLecturerById,
  getCoursesById,
  getStudentsInSession,
  closeSession,
  getActiveSession,
} = require("../controllers/lecturerOps");
const router = express.Router();

router.get("/closeSession", verifyJWT, closeSession);
router.get("/getActiveSession", verifyJWT, getActiveSession);
router.get("/getStudentsInSession", verifyJWT, getStudentsInSession);
router.post("/getCoursesById", verifyJWT, getCoursesById);
router.get("/createSession", verifyJWT, createSession);
router.get("/", verifyJWT, getLecturerById);

module.exports = router;
