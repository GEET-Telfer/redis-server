const AssessmentApis = require("../apis/Assessment");
const redisClient = require("../redis");

/**
 * Retrieve data from cache if exists, otherwise, request from database.
 * @returns
 */
const getAssessmentQuestion = async (req, res) => {
  const key = "assessment";
  let results;
  try {
    const cacheResults = await redisClient.get(key);
    if (cacheResults) {
      isCached = true;
      results = JSON.parse(cacheResults);
      console.log(`Get cache: ${key}`);
    } else {
      results = await AssessmentApis.fetchAssessmentQuestions();
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

module.exports = {getAssessmentQuestion}