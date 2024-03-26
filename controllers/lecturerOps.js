const asyncErrorWrapper = require("express-async-handler");
const Session = require("../models/sessions");
const Lecturer = require("../models/lecturer");
const createSession = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.user;
  const { courseId } = req.query;

  const session = await Session.create({
    lecturer: id,
    course: courseId,
    date: new Date().getUTCDate(),
    attendedStudents: [],
  });
  if (session) {
    res.status(200).json({ success: true, sessionId: session._id });
  } else {
    next(new Error("Session oluştururken bir sorunla karşılaşıldı."));
  }
});
const getLecturerById = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.user;
  const lecturer = await Lecturer.findById(id);
  if (lecturer) {
    res.status(200).json({
      lecturerName: lecturer.name,
      lecturerSurname: lecturer.surname,
      lecturerCourses: lecturer.courses,
      lecturerSessions: lecturer.sessions,
    });
  } else {
    next(new Error("Eğitmen detaylarını alırken bir sorunla karşılaştık."));
  }
});

module.exports = { createSession, getLecturerById };
