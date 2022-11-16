const express = require("express");
const AssessmentController = require("../controllers/AssessmentController");

const router = express.Router();


router.get('/fetch-all', AssessmentController.getAssessmentQuestion());
router.post('/submit-user-response', AssessmentController.submitAssessmentResponse());

module.exports = router;