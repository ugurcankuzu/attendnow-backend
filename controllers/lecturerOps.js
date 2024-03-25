const asyncErrorWrapper = require("express-async-handler");
const Session = require("../models/sessions");
const createSession = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.user;
  const { courseId } = req.query;

  const session = await Session.create({
    lecturer: id,
    course: courseId,
    date: new Date().getUTCDate(),
    attendedStudents: [],
  });
  res.status(200).json({ success: true, sessionId: session._id });
});

module.exports = { createSession };
