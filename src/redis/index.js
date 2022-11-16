const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  redisClient.on("connect", () => console.log(`Redis server connected`));

  await redisClient.connect();
})();

module.exports = redisClient;