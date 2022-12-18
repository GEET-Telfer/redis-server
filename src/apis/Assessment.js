const axios = require("axios");
const crypto = require('crypto');

const dotenv = require("dotenv");
dotenv.config();

const type = "assessment";
const version = "v1";
const endpoint = `${process.env.LOCALHOST_ENDPOINT}/${type}/${version}`;

/**
 * Fetch all the published assessment questions to the client.
 */
const fetchAssessmentQuestions = async () => {
  const apiRes = await axios.get(`${endpoint}/find-all`);
  console.log("Request sent to the api");
  return apiRes;
};

/**
 * Create an assessment question with random UUID.
 */
const createAssessmentQuestion = async (question) => {  
  question.uuid = crypto.randomUUID();
  const apiRes = await axios.post(`${endpoint}/add`, { data: question });
  console.log("Creating assessment question");
  return apiRes;
};

/**
 * Update assessment question based on the assessment id.
 */
const updateAssessment = async (question) => {

  if (!question.id) throw "Missing Id";

  const apiRes = await axios.post(`${endpoint}/update`, { data: question });
  console.log("Updating assessment question: " + question.id);
  return apiRes;
};

/**
 * Delete assessment question based on the assessment id.
 */
const deleteAssessment = async (id) => {
  if (!id) throw "Missing Id";

  const apiRes = await axios.post(`${endpoint}/delete`, { id : id });
  console.log("Deleting assessment question: " + id);
  return apiRes;
};

/**
 * Fetch all the assessment questions regardless of their statuses
 */
const fetchAssessmentQuestions4Admin = async () => {
  const apiRes = await axios.get(`${process.env.LOCALHOST_ENDPOINT}/admin/${type}/${version}/find-all`);
  console.log("Request sent to the api");
  return apiRes;
}

module.exports = {
  fetchAssessmentQuestions,
  createAssessmentQuestion,
  updateAssessment,
  deleteAssessment,
  fetchAssessmentQuestions4Admin
};