const express = require("express");
const AdminController = require("../controllers/AdminController");

const router = express.Router();

router.post("/assessment/update", AdminController.clearAssessmentCache);
router.post("/assessment/delete", AdminController.clearAssessmentCache);

module.exports = router;