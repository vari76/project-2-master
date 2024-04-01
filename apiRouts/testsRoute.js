const express = require("express");

const router = express.Router();
const { creatTests, getAllTests } = require("../service/testsService");

router.route("/:patientId/tests").post(creatTests).get(getAllTests);

module.exports = router;
