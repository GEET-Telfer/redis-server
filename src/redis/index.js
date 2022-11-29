const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient({
    // url: `http://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  });

  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  redisClient.on("connect", () => console.log(`Redis server connected`));

  await redisClient.connect();
})();

module.exports = redisClient;
