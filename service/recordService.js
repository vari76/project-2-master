const asyncHandler = require("express-async-handler");

const slugify = require("slugify");

const recordModel = require("../models/recordModel");

const patientModel = require("../models/patientModel");

const apiError = require("../utils/apiError");

exports.createRecord = asyncHandler(async (req, res) => {
  const { patientId } = req.params;
  const { type, reading } = req.body;

  const patient = await patientModel.findById(patientId);
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  const recordData = { type, reading };
  const record = await recordModel.create(recordData);

  patient.tests.push(record._id);
  await patient.save();

  res.status(201).json({ data: record });
});

//@Get All Record For Specific Patient Method
exports.getAllRecordsForPatient = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  const patient = await patientModel.findById(patientId);
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  //to get records for specific patient
  const records = await recordModel.find({ _id: { $in: patient.tests } });

  res.status(200).json({ status: 200, data: records });
});

//@Get Specific Record For Specific Patient Method
exports.getRecordsByIdForPatient = asyncHandler(async (req, res) => {
  const { patientId, id } = req.params;

  const patient = await patientModel.findById(patientId);
  const record = await recordModel.findById(id);
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }
  if (!record) {
    return res.status(404).json({ message: "Record not found" });
  }
  res.status(200).json({ status: 200, data: record });
});

//@Update Specific Record For Specific Patient Method
exports.UpdateRecordsByIdForPatient = asyncHandler(async (req, res) => {
  const { patientId, id } = req.params;
  const { type, reading } = req.body;
  const recordData = {
    type,
    reading,
  };
  const patient = await patientModel.findById(patientId);
  const record = await recordModel.findByIdAndUpdate({ _id: id }, recordData);
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }
  if (!record) {
    return res.status(404).json({ message: "Record not found" });
  }

  res.status(200).json({ status: 200, data: record });
});

//@Delete Specific Record For Specific Patient Method
exports.deleteRecordsByIdForPatient = asyncHandler(async (req, res) => {
  const { patientId, id } = req.params;

  const patient = await patientModel.findById(patientId);
  const record = await recordModel.findByIdAndDelete(id);
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }
  if (!record) {
    return res.status(404).json({ message: "Record not found" });
  }
  res.status(200).json({ status: 200, data: record });
});
