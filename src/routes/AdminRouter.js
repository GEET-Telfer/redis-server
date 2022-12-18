const express = require("express");
const AdminController = require("../controllers/AdminController");

const router = express.Router();

router.post("/assessment/create", AdminController.createAssessment);
router.post("/assessment/update", AdminController.updateAssessment);
router.post("/assessment/delete", AdminController.deleteAssessment);


router.post("/course/create", AdminController.createCourse);
router.post("/course/update", AdminController.updateCourse);
router.post("/course/delete", AdminController.deleteCourse);

router.get("/assessment/fetch-all", AdminController.fetchAssessmentQuestions4Admin);
router.get("/course/fetch-all", AdminController.fetchCourses4Admin);

router.get("/course/get", AdminController.fetchCourseById4Admin);
module.exports = router;