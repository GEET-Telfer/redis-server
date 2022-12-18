const CourseApis = require("../apis/Course");
const redisClient = require("../redis");

const courseClientKey = "course";
const courseAllKey = "course-all";

/**
 * Fetch all the published courses
 */
const getAllCourses = async (req, res) => {
  let results;
  try {
    const cacheResults = await redisClient.get(courseAllKey);
    if (cacheResults) {
      results = JSON.parse(cacheResults);
      console.log(`Get cache: ${courseAllKey}`);
    } else {
      results = await CourseApis.fetchAllCourses();
      results = results.data;
      if (results.length === 0) {
        throw "API returned an empty array";
      }
      await redisClient.set(courseAllKey, JSON.stringify(results));
      console.log(`Set cache: ${courseAllKey}`);
    }

    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(404).send("Data unavailable");
  }
};

/**
 * Fetch course by id
 */
const getCourseById = async (req, res) => {
  const id = req.query?.id; // uuid
  const key = `${courseClientKey}-${id}`;
  let results;
  try {
    const cacheResults = await redisClient.get(key);
    if (cacheResults) {
      results = JSON.parse(cacheResults);
      console.log(`Get cache: ${key}`);
    } else {
      results = await CourseApis.fetchCourseById(id);
      results = results.data;
      if (results.length === 0) {
        throw "API returned an empty array";
      }
      await redisClient.set(key, JSON.stringify(results));
      console.log(`Set cache: ${key}`);
    }

    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(404).send("Data unavailable");
  }
};

module.exports = { getAllCourses, getCourseById };
