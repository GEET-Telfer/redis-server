const express = require("express");
const CourseController = require("../controllers/CourseController");

const router = express.Router();


router.get('/fetch-all', CourseController.getAllCourses);
router.get('/get', CourseController.getCourseById);

module.exports = router;