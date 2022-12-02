const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const type = "course";
const version = "v1";
const endpoint = `${process.env.LOCALHOST_ENDPOINT}/${type}/${version}`;

const fetchAllCourses = async () => {
  const apiRes = await axios.get(`${endpoint}/find-all`);
  console.log("Request sent to the api");

  return apiRes;
};

const fetchCourseById = async (id) => {
  const apiRes = await axios.get(`${endpoint}/get`, {
    params: {
      id: id,
    },
  });
  console.log(`Fetch course by id: ${id}`);
  return apiRes;
};

const createCourse = async (course) => {
  const apiRes = await axios.post(`${endpoint}/add`, { data: course });

  console.log("Crate course");
  return apiRes;
};

const updateCourse = async (course) => {
  const id = course?.id;

  if (!id) throw "Missing Id";

  const apiRes = await axios.post(`${endpoint}/update`, { data: course });

  console.log("Updating course: " + id);
  return apiRes;
};

const deleteCourse = async (id) => {
  if (!id) throw "Missing Id";

  const apiRes = await axios.post(`${endpoint}/delete`, { id : id });

  console.log("Deleting course: " + id);

  return apiRes;
};

module.exports = {
  fetchAllCourses,
  fetchCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
