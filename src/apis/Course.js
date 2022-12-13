const axios = require("axios");
const crypto = require('crypto');

const dotenv = require("dotenv");
dotenv.config();

const type = "course";
const version = "v1";
const endpoint = `${process.env.LOCALHOST_ENDPOINT}/${type}/${version}`;

/**
 * Fetch all the published courses
 */
const fetchAllCourses = async () => {
  const apiRes = await axios.get(`${endpoint}/find-all`);
  console.log("Request sent to the api");

  return apiRes;
};

/**
 * Fetch course by uuid
 */
const fetchCourseById = async (uuid) => {
  const apiRes = await axios.get(`${endpoint}/get`, {
    params: {
      uuid: uuid,
    },
  });
  console.log(`Fetch course by uuid: ${uuid}`);
  return apiRes;
};

/**
 * Create course with random UUID
 */
const createCourse = async (course) => {
  course.uuid = crypto.randomUUID();
  const apiRes = await axios.post(`${endpoint}/add`, { data: course });

  console.log("Crate course");
  return apiRes;
};

/**
 * Update course with course id
 */
const updateCourse = async (course) => {
  const id = course?.id;

  if (!id) throw "Missing Id";

  const apiRes = await axios.post(`${endpoint}/update`, { data: course });

  console.log("Updating course: " + id);
  return apiRes;
};

/**
 * Delete course with course id
 */
const deleteCourse = async (id) => {
  if (!id) throw "Missing Id";

  const apiRes = await axios.post(`${endpoint}/delete`, { id : id });

  console.log("Deleting course: " + id);

  return apiRes;
};

/**
 * Fetch all the courses regardless of their statuses
 */
const fetchAllCourses4Admin = async () => {
  const apiRes = await axios.get(`${process.env.LOCALHOST_ENDPOINT}/admin/${type}/${version}/find-all`);
  console.log("Request sent to the api");
  return apiRes;
}

module.exports = {
  fetchAllCourses,
  fetchCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  fetchAllCourses4Admin
};
