const express = require("express");
const AdminController = require("../controllers/AdminController");

const router = express.Router();

router.post("/assessment/create", AdminController.createAssessment);
router.post("/assessment/update", AdminController.updateAssessment);
router.post("/assessment/delete", AdminController.deleteAssessment);


router.post("/course/create", AdminController.createCourse);
router.post("/course/update", AdminController.updateCourse);
router.post("/course/delete", AdminController.deleteCourse);

router.post("/admin/assessment/fetch-all", AdminController.fetchAssessmentQuestions4Admin);
router.post("/admin/course/fetch-all", AdminController.fetchCourses4Admin);

module.exports = router;