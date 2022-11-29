const express = require("express");
const AssessmentController = require("../controllers/AssessmentController");
const UserResponseController = require("../controllers/UserResponseController");

const router = express.Router();

router.get("/fetch-all", AssessmentController.getAssessmentQuestion);
router.post("/submit-user-response", UserResponseController.submitUserResponse);

module.exports = router;
