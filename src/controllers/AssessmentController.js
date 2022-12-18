const AssessmentApis = require("../apis/Assessment");
const redisClient = require("../redis");

const assessmentClientKey = "assessment";

/**
 * Retrieve data from cache if exists, otherwise, request from database.
 * @returns
 */
const getAssessmentQuestion = async (req, res) => {
  let results;
  try {
    const cacheResults = await redisClient.get(assessmentClientKey);
    if (cacheResults) {
      isCached = true;
      results = JSON.parse(cacheResults);
      console.log(`Get cache: ${assessmentClientKey}`);
    } else {
      results = await AssessmentApis.fetchAssessmentQuestions();
      results = results.data;
      if (results.length === 0) {
        throw "API returned an empty array";
      }
      await redisClient.set(assessmentClientKey, JSON.stringify(results));
      console.log(`Set cache: ${assessmentClientKey}`);
    }

    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(404).send("Data unavailable");
  }
};

module.exports = {getAssessmentQuestion}