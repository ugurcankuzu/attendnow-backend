const mongoose = require("mongoose");
const asyncErrorWrapper = require("express-async-handler");
const Session = require("../models/sessions");
const Lecturer = require("../models/lecturer");
const Course = require("../models/courses");
const sessions = require("../models/sessions");
const students = require("../models/students");
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
    const lecturer = await Lecturer.updateOne(
      { _id: id },
      { $push: { sessions: session._id }, activeSession: session._id }
    );
    if (lecturer) {
      res.status(200).json({ success: true, sessionId: session._id });
    } else {
      next(new Error("Session kullanıcıya kaydedilirken hata oluştu."));
    }
  } else {
    next(new Error("Session oluştururken bir sorunla karşılaşıldı."));
  }
});
const closeSession = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.user;
  const lecturer = await Lecturer.updateOne(
    { _id: id },
    { activeSession: null }
  );
  if (lecturer) {
    res.status(200).send({ success: true });
  } else {
    next(new Error("Session kapatılırken bir hata oluştu"));
  }
});
const getActiveSession = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.user;
  const lecturer = await Lecturer.findById(id);
  if (lecturer) {
    res.status(200).send({ success: true, sessionId: lecturer.activeSession });
  } else {
    next(new Error("Aktif session alınırken hata oluştu"));
  }
});
const getLecturerById = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.user;
  const lecturer = await Lecturer.findById(id);
  if (lecturer) {
    res.status(200).json({
      success: true,
      lecturer: {
        lecturerName: lecturer.name,
        lecturerSurname: lecturer.surname,
        lecturerCourses: lecturer.courses,
        lecturerSessions: lecturer.sessions,
        lecturerActiveSession: lecturer.activeSession,
      },
    });
  } else {
    next(new Error("Eğitmen detaylarını alırken bir sorunla karşılaştık."));
  }
});

const getCoursesById = asyncErrorWrapper(async (req, res, next) => {
  const courses = req.body;
  const resolvedCourses = await Course.find({
    _id: { $in: courses.map((course) => new mongoose.Types.ObjectId(course)) },
  });
  if (resolvedCourses) {
    res.status(200).json({ success: true, courses: resolvedCourses });
  } else {
    next(new Error("Eğitmene ait dersler bulunurken sorun oluştu."));
  }
});
const getStudentsInSession = asyncErrorWrapper(async (req, res, next) => {
  const { sessionId } = req.query;
  const students = await sessions
    .findById(sessionId)
    .populate("attendedStudents");
  if (students) {
    res
      .status(200)
      .send({ success: true, students: students.attendedStudents });
  } else {
    next(new Error("Öğrenciler Alınırken Bir Sorun Oluştu."));
  }
});
module.exports = {
  createSession,
  getLecturerById,
  getCoursesById,
  getStudentsInSession,
  closeSession,
  getActiveSession,
};
