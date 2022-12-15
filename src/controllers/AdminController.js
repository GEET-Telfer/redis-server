const redisClient = require("../redis");
const AssessmentApis = require("../apis/Assessment");
const CourseApis = require("../apis/Course");

const assessmentClientKey = "assessment";
const assessmentAdminKey = "assessment-admin";

const courseClientKey = "course";
const courseAllKey = "course-all";
const courseAdminKey = "course-admin";

/**
 * Notify redis server to clear cache when delete/update operation is called in database
 */
const deleteCache = async (key) => {
  await redisClient.del(key);
  console.log(`Del cache: ${key}`);
};

/**
 * Send err message back to the client
 */
const handleErrStatus = (res, err) => {
  const statusCode = err?.response?.status || 400;
  const message = err?.response?.data?.data || "";
  console.error(err);
  res.status(statusCode).send(message);
}
/**
 * Create assessment question
 */
const createAssessment = async (req, res) => {
  let result;
  try {
    result = await AssessmentApis.createAssessmentQuestion(req.body);
    result = result.data;

    if (!result.success) {
      throw "Failed to create assessment question";
    }

    deleteCache(assessmentClientKey);
    deleteCache(assessmentAdminKey);
    res.sendStatus(200);
  } catch (err) {
    handleErrStatus(res, err);
  }
};

/**
 * Update assessment and reset assessment-question cache
 */
const updateAssessment = async (req, res) => {
  let result;

  try {
    result = await AssessmentApis.updateAssessment(req.body);
    result = result.data;

    if (!result.success) {
      throw "Failed to update assessment question";
    }

    deleteCache(assessmentClientKey);
    deleteCache(assessmentAdminKey);

    res.sendStatus(200);
  } catch (err) {
    handleErrStatus(res, err);
  }
};

/**
 * Delete assessment and reset assessment-question cache
 */
const deleteAssessment = async (req, res) => {
  let result;

  try {
    result = await AssessmentApis.deleteAssessment(req.body?.id);
    result = result.data;

    if (!result.success) {
      throw "Failed to delete assessment question";
    }

    deleteCache(assessmentClientKey);
    deleteCache(assessmentAdminKey);

    res.sendStatus(200);
  } catch (err) {
    handleErrStatus(res, err);
  }
};

/**
 * Fetch all the assessment questions regardless of their status
 */
const fetchAssessmentQuestions4Admin = async (req, res) => {
  let results;

  try {
    const cacheResults = await redisClient.get(assessmentAdminKey);
    if (cacheResults) {
      results = JSON.parse(cacheResults);
      console.log(`Get cache: ${assessmentAdminKey}`);
    } else {
      results = await AssessmentApis.fetchAssessmentQuestions4Admin();
      results = results.data;
      if (results.length === 0) {
        throw "API returned an empty array";
      }
      await redisClient.set(assessmentAdminKey, JSON.stringify(results));
      console.log(`Set cache: ${assessmentAdminKey}`);
    }

    res.send(results);
  } catch (err) {
    handleErrStatus(res, err);
  }
}

// ========================================================================

/**
 * Create course and reset outdated course-all cache
 */
const createCourse = async (req, res) => {
  let result;
  try {
    result = await CourseApis.createCourse(req.body);
    result = result.data;

    if (!result.success) {
      throw "Failed to create course";
    }

    deleteCache(courseAllKey);
    deleteCache(courseAdminKey);

    res.sendStatus(200);
  } catch (err) {
    handleErrStatus(res, err);
  }

};

/**
 * Update course and reset outdated course-id and course-all cache
 */
const updateCourse = async (req, res) => {
  const id = req.body?.id;
  const uuid = req.body?.uuid;
  const course = req.body;
  const key = `${courseClientKey}-${id}`;

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

    deleteCache(key);
    deleteCache(`${courseClientKey}-${uuid}`);
    deleteCache(courseAllKey);
    deleteCache(courseAdminKey);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    handleErrStatus(res, err);
;
  }
};

/**
 * Delete course and reset outdated course-id and course-all caceh
 */
const deleteCourse = async (req, res) => {
  const id = req.body?.id;
  const uuid = req.body?.uuid;
  const key = `${courseClientKey}-${id}`;

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

    deleteCache(key);
    deleteCache(`${courseClientKey}-${uuid}`);
    deleteCache(courseAllKey);
    deleteCache(courseAdminKey);

    res.sendStatus(200);
  } catch (err) {
    handleErrStatus(res, err);
  }
};

/**
 * Fetch all the courses regardless of their status
 */
const fetchCourses4Admin = async (req, res) => {
  let results;

  try {
    const cacheResults = await redisClient.get(courseAdminKey);
    if (cacheResults) {
      results = JSON.parse(cacheResults);
      console.log(`Get cache: ${courseAdminKey}`);
    } else {
      results = await CourseApis.fetchAllCourses4Admin();
      results = results.data;
      if (results.length === 0) {
        throw "API returned an empty array";
      }
      await redisClient.set(courseAdminKey, JSON.stringify(results));
      console.log(`Set cache: ${courseAdminKey}`);
    }

    res.send(results);
  } catch (err) {
    // res.status(404).send("Data unavailable");
    handleErrStatus(res, err);
  }
}



module.exports = {
  createAssessment,
  updateAssessment,
  deleteAssessment,
  createCourse,
  updateCourse,
  deleteCourse,
  fetchAssessmentQuestions4Admin,
  fetchCourses4Admin
};
