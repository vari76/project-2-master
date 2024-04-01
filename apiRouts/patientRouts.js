const express = require("express");

const router = express.Router();

const {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  getPatientCriticalConditions,
  removeCritical,
} = require("../service/patientService");

router.route("/conditions").get(getPatientCriticalConditions);
router.route("/").get(getAllPatients).post(createPatient);
router.route("/:patientId").get(getPatientById).put(updatePatient);
router.route("/:patientId/tests/:testId/fix").post(removeCritical);



module.exports = router;
