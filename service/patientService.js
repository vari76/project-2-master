const asyncHandler = require("express-async-handler");

const slugify = require("slugify");

const patientModel = require("../models/patientModel");
const testsModel = require("../models/testsModel");

const apiError = require("../utils/apiError");

exports.createPatient = asyncHandler(async (req, res, next) => {
  const {
    first_name,
    last_name,
    email,
    mobile_number,
    address,
    sex,
    date_of_birth,
  } = req.body;

  const patient = new patientModel({
    first_name,
    last_name,
    email,
    mobile_number,
    address,
    sex,
    date_of_birth,
  });
  const newpatient = await patient.save();
  res.status(201).json(newpatient);
});
exports.getAllPatients = asyncHandler(async (req, res) => {
  const patinets = await patientModel.find({});
  res.status(200).json(patinets);
});

exports.getPatientById = asyncHandler(async (req, res) => {
  const { patientId } = req.params;
  const patient = await patientModel.findById({ _id: patientId });
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }
  res.status(200).json(patient);
});

exports.updatePatient = asyncHandler(async (req, res, next) => {
  const { patientId } = req.params;
  const {
    first_name,
    last_name,
    email,
    mobile_number,
    address,
    sex,
    date_of_birth,
  } = req.body;

  const newPatientData = {
    first_name,
    last_name,
    email,
    mobile_number,
    address,
    sex,
    date_of_birth,
  };

  const patient = await patientModel.findByIdAndUpdate(
    { _id: patientId },
    newPatientData,
    { new: true }
  );
  if (!patient) {
    return next(new apiError("this patient not found", 404));
  }
  res.status(200).json(patient);
});

exports.getPatientCriticalConditions = asyncHandler(async (req, res) => {
  // Use `find` to get all matching documents instead of just one
  const patientsWithHighBP = await patientModel.find({
    conditions: { $in: ["Blood Pressure High"] },
  });

  // Check if any patients were found
  if (patientsWithHighBP.length === 0) {
    return res
      .status(404)
      .json({ message: "No patients found with high blood pressure." });
  }

  res.status(200).json(patientsWithHighBP);
});

exports.removeCritical = asyncHandler(async (req, res, next) => {
  const patientId = req.params.patientId;
  const testId = req.params.testId;
  const { category, date, nurse_name, readings } = req.body;

  const test = await testsModel.findByIdAndUpdate(testId, {
    category,
    date,
    nurse_name,
    $set: {
      "readings.diastolic": readings.diastolic,
      "readings.systolic": readings.systolic,
    },
  });
  const patient = await patientModel.findByIdAndUpdate(
    patientId,
    {
      $unset: { test_id: "", date_tested: "", conditions: "" },
    },
    { new: true }
  );

  if (!patient) {
    return next(new apiError("This patient not found", 404));
  }

  res.status(200).json({ success: true, data: patient });
});

