const axios = require("axios");

const type = "user-response";
const version = "v1";
const endpoint = `http://localhost/wp-json/${type}/${version}`;

const submitUserResponse = async (data) => {
  const apiRes = await axios.post(`${endpoint}/add`, data);
  console.log("Submit user response");
  return apiRes;
};

module.exports = {submitUserResponse}