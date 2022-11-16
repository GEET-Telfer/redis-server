const express = require("express");
const AdminController = require("../controllers/AdminController");

const router = express.Router();

router.post("/update", AdminController.handleChangeOnAssessmentQuestion("update"));
router.post("/delete", AdminController.handleChangeOnAssessmentQuestion("delete"));

module.exports = router;