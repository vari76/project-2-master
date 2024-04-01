const express = require("express");

const router = express.Router();

const {
  createRecordValidator,
  getRecordByIdValidator,
  UpdateRecordValidator,
  deleteRecordByIdValidator,
} = require("../utils/validator/recordValidator");

const {
  createRecord,
  getAllRecordsForPatient,
  getRecordsByIdForPatient,
  UpdateRecordsByIdForPatient,
  deleteRecordsByIdForPatient,
} = require("../service/recordService");

router
  .route("/:patientId/tests")
  .get(getAllRecordsForPatient)
  .post(createRecordValidator, createRecord);

router
  .route("/:patientId/tests/:id")
  .get(getRecordByIdValidator, getRecordsByIdForPatient)
  .put(UpdateRecordValidator, UpdateRecordsByIdForPatient)
  .delete(deleteRecordByIdValidator, deleteRecordsByIdForPatient);
module.exports = router;
