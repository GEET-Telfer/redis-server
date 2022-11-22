const redisClient = require("../redis");

/**
 * Notify redis server to clear assessment cache when delete/update operation is called in database
 */
const clearAssessmentCache = async(req, res) => {
    const key = "assessment";

    await redisClient.del(key);
    console.log(`Del cache: ${key}`);
    res.sendStatus(200);
}
module.exports = {clearAssessmentCache};