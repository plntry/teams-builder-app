const specialization = require("./specializationHelper");
const candidate = require("./candidateHelper");
const compatibility = require("./compatibilityHelper");

const helper = {
    specialization: specialization,
    candidate: candidate,
    compatibility: compatibility
};

module.exports = helper;