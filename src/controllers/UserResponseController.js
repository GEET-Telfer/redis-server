const redisClient = require("../redis");
const UserResponseApis = require("../apis/UserResponse");

/**
 * Cache user footprint for submitting assessment forms on a timeout.
 * No repeated requests should be sent from the same user during the timeout.
 * @returns
 */
const submitUserResponse = async (req, res) => {
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
      await UserResponseApis.submitUserResponse(req.body);

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
    res.status(400).send(error?.response?.data?.data);
  }
};

module.exports = { submitUserResponse };
