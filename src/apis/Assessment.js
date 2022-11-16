const axios = require("axios");

const fetchAssessmentQuestions = async () => {
  const apiRes = await axios.get(
    "http://localhost/wp-json/assessment/v1/find-all"
  );
  console.log("Request sent to the api");
  return apiRes;
};

const submitUserResponse = async(data) => {
  const apiRes = await axios.post(
    "http://localhost/wp-json/user-response/v1/add",
    data
  );
  console.log("Submit user response");
  return apiRes;
}

exports.getAllQuestions = fetchAssessmentQuestions;
exports.submitUserResponse = submitUserResponse;