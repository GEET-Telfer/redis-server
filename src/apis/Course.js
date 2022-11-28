const axios = require("axios");

const fetchAllCourses = async () => {
  const apiRes = await axios.get("http://localhost/wp-json/course/v1/find-all");
  console.log("Request sent to the api");

  return apiRes;
};

const fetchCourseById = async (id) => {
  const apiRes = await axios.get(
    `http://localhost/wp-json/course/v1/get`,
    {
      params: {
        id: id,
      },
    }
  );
  console.log(`Fetch course by id: ${id}`);
  return apiRes;
};

module.exports = { fetchAllCourses, fetchCourseById };
