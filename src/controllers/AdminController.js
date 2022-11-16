const AdminApis = require("../apis/Admin");
const redisClient = require("../redis");

/**
 * Invalidate assessment cache after updating or deleting assessment question.
 */
const handleChangeOnAssessmentQuestion = (action) => async (req, res) => {
    const key = "assessment";
    let results;

    try {
        switch (action) {
            case "update":
                results = await AdminApis.updateAssessmentQuestion(req.body);
                break;
            case "delete":
                results = await AdminApis.deleteAssessmentQuestion(req.body);
                break;
            default:
                break;
        }

        results?.then(() => {
            redisClient.del(key);
            console.log(`Del cache: ${key}`);
        });
        res.send(results.response);
    } catch (error) {
        res.status(error?.response?.status)
            .send(error?.response?.data?.data);
    }
}

exports.handleChangeOnAssessmentQuestion = handleChangeOnAssessmentQuestion;