const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const type = "user-response";
const version = "v1";
const endpoint = `${process.env.LOCALHOST_ENDPOINT}/${type}/${version}`;

const submitUserResponse = async (data) => {
  const apiRes = await axios.post(`${endpoint}/add`, data);
  console.log("Submit user response");
  return apiRes;
};

module.exports = {submitUserResponse}