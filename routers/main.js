const express = require("express");
const auth = require("./auth");
const lectauth = require("./lectauth"); //Lecturer authentication routes
const lecturerOps = require("./lecturerOps"); //Lecturer Desktop operations routes
const router = express.Router();

router.use("/auth", auth);
router.use("/auth/lecturer", lectauth);
router.use("/lecturer", lecturerOps);

module.exports = router;
