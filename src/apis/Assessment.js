const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const type = "assessment";
const version = "v1";
const endpoint = `${process.env.LOCALHOST_ENDPOINT}/${type}/${version}`;

const fetchAssessmentQuestions = async () => {
  const apiRes = await axios.get(`${endpoint}/find-all`);
  console.log("Request sent to the api");
  return apiRes;
};

const createAssessmentQuestion = async (question) => {
  const apiRes = await axios.post(`${endpoint}/add`, { data: question });
  console.log("Creating assessment question");
  return apiRes;
};

const updateAssessment = async (question) => {

  if (!question.id) throw "Missing Id";

  const apiRes = await axios.post(`${endpoint}/update`, { data: question });
  console.log("Updating assessment question: " + question.id);
  return apiRes;
};

const deleteAssessment = async (id) => {
  if (!id) throw "Missing Id";

  const apiRes = await axios.post(`${endpoint}/delete`, { id : id });
  console.log("Deleting assessment question: " + id);
  return apiRes;
};

module.exports = {
  fetchAssessmentQuestions,
  createAssessmentQuestion,
  updateAssessment,
  deleteAssessment
};