const AssessmentApis = require("../apis/Assessment");
const redisClient = require("../redis");

/**
 * Retrieve data from cache if exists, otherwise, request from database.
 * @returns
 */
const getAssessmentQuestion = () => async (req, res) => {
  const key = "assessment";
  let results;
  try {
    const cacheResults = await redisClient.get(key);
    if (cacheResults) {
      isCached = true;
      results = JSON.parse(cacheResults);
      console.log(`Get cache: ${key}`);
    } else {
      results = await AssessmentApis.getAllQuestions();
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

/**
 * Cache user footprint for submitting assessment forms on a timeout. 
 * No repeated requests should be sent from the same user during the timeout.
 * @returns
 */
const submitAssessmentResponse = () => async (req, res) => {
  const key = req.body.user_email;
  const TIMEOUT = 30;
  console.log(key);
  try {
    const cacheResults = await redisClient.get(key);
    if (cacheResults) {
      // cached user_email stay in cooldown
      const ttl = await redisClient.ttl(key);
      console.log(`${key} cooldown...${ttl}`);
      res.status(425).send({ message: "ttl:" + ttl });
    } else {
      await AssessmentApis.submitUserResponse(req.body);

      await redisClient.set(key, "EX").then(async () => {
        await redisClient.expire(key, TIMEOUT);
        console.log(`Set cache on ${key} with timeout ${TIMEOUT} seconds`);
      });

      const ttl = await redisClient.ttl(key);

      res.send({
        key: key,
        cooldown: ttl,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400)
      .send(error?.response?.data?.data);
  }
};

exports.getAssessmentQuestion = getAssessmentQuestion;
exports.submitAssessmentResponse = submitAssessmentResponse;
