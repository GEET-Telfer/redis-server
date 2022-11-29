const redisClient = require("../redis");
const AssessmentApis = require("../apis/Assessment");
const CourseApis = require("../apis/Course");

/**
 * Notify redis server to clear assessment cache when delete/update operation is called in database
 */
const clearAssessmentCache = async (req, res) => {
  const key = "assessment";

  await redisClient.del(key);
  console.log(`Del cache: ${key}`);
  res.sendStatus(200);
};

const clearCourseCache = async (req, res) => {
  const courseId = req.body?.id;

  const key = `course-${courseId}`;

  await redisClient.del(key);
  await redisClient.del("course-all");
  console.log(`Del cache: ${key}`);
  res.sendStatus(200);
};

const createAssessment = async (req, res) => {
  const key = "assessment";
  let result;
  try {
    result = await AssessmentApis.createAssessmentQuestion(req.body);
    result = result.data;

    if (!result.success) {
      throw "Failed to create assessment question";
    }

    await redisClient.del(key);
    console.log(`Del cache: ${key}`);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Update assessment
 */
const updateAssessment = async (req, res) => {
  const key = "assessment";

  let result;

  try {
    result = await AssessmentApis.updateAssessment(req.body);
    result = result.data;

    if (!result.success) {
      throw "Failed to update assessment question";
    }

    await redisClient.del(key);
    console.log(`Del cache: ${key}`);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
};

const deleteAssessment = async (req, res) => {
  const key = "assessment";

  try {
    result = await AssessmentApis.deleteAssessment(req.body?.id);
    result = result.data;

    if (!result.success) {
      throw "Failed to delete assessment question";
    }

    await redisClient.del(key);
    console.log(`Del cache: ${key}`);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
};
// ========================================================================

const createCourse = async (req, res) => {
  const key = "course-all";
  let result;
  try {
    result = await CourseApis.createCourse(req.body);
    result = result.data;

    if (!result.success) {
      throw "Failed to create course";
    }

    await redisClient.del(key);
    console.log(`Del cache: ${key}`);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }

};

const updateCourse = async (req, res) => {
  const id = req.body?.id;
  const course = req.body;
  const key = `course-${id}`;

  if (!id) {
    throw "Missing Id";
  }

  let result;
  try {
    result = await CourseApis.updateCourse(course);
    result = result.data;

    if (!result.success) {
      throw "API failed to update course";
    }

    await redisClient.del(key);
    await redisClient.del("course-all"); // clear the out-dated course-all cache
    console.log(`Del cache: ${key}`);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
};

const deleteCourse = async (req, res) => {
  const id = req.body?.id;
  const key = `course-${id}`;

  if (!id) {
    throw "Missing Id";
  }

  let result;
  try {
    result = await CourseApis.deleteCourse(id);
    result = result.data;

    if (!result.success) {
      throw "API failed to delete course";
    }

    await redisClient.del(key);
    await redisClient.del("course-all"); // clear the out-dated course-all cache
    console.log(`Del cache: ${key}`);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createAssessment,
  updateAssessment,
  deleteAssessment,
  createCourse,
  updateCourse,
  deleteCourse,
  clearAssessmentCache,
  clearCourseCache
};
