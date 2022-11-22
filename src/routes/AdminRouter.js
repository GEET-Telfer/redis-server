const express = require("express");
const AdminController = require("../controllers/AdminController");

const router = express.Router();

router.post("/update", AdminController.clearAssessmentCache);
router.post("/delete", AdminController.clearAssessmentCache);

module.exports = router;