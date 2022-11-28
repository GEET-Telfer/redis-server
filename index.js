const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const AssessmentRouter = require("./src/routes/AssessmentRouter");
const AdminRouter = require("./src/routes/AdminRouter");
const CourseRouter = require("./src/routes/CourseRouter");

const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;

app.use("/assessment", AssessmentRouter);
app.use("/admin", AdminRouter);
app.use("/course", CourseRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});