const axios = require("axios");

const updateAssessmentQuestion = async (data) => {
    const apiRes = await axios.post(
        "http://localhost/wp-json/assessment/v1/update",
        data
    );
    console.log("Updating assessment question");
    return apiRes;
};

const deleteAssessmentQuestion = async (data) => {
    const apiRes = await axios.post(
        "http://localhost/wp-json/assessment/v1/delete",
        data
    );
    console.log("Deleting assessment question");
    return apiRes;
};

exports.updateAssessmentQuestion = updateAssessmentQuestion;
exports.deleteAssessmentQuestion = deleteAssessmentQuestion;
