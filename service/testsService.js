const asyncHandler = require("express-async-handler");
const patientModel = require("../models/patientModel");
const testsModel = require("../models/testsModel");
const apiError = require("../utils/apiError");

exports.creatTests = asyncHandler(async (req, res, next) => {
  const { patientId } = req.params;
  const { category, date, nurse_name, readings } = req.body;
  const patient = await patientModel.findById(patientId);
  if (!patient) {
    return next(new apiError("patient not found ", 404));
  }
  const testdata = new testsModel({
    patient_id: patientId,
    category,
    date,
    nurse_name,
    readings,
  });
  if (category === "Blood Pressure" && readings.systolic > 100) {
    const newTest = await testdata.save();
    patient.tests.push(newTest._id);
    patient.conditions.push("Blood Pressure High");
    patient.test_id = newTest._id;
    patient.date_tested = newTest.date;
    await patient.save();
    res.status(201).json(newTest);
  } else {
    const newTest = await testdata.save();
    patient.tests.push(newTest._id);
    await patient.save();
    res.status(201).json(newTest);
  }
});

exports.getAllTests = asyncHandler(async (req, res, next) => {
  const { patientId } = req.params;
  const patient = await patientModel.findById(patientId);
  if (!patient) {
    return next(new apiError("patient not found ", 404));
  }
  const tests = await testsModel.find({ _id: { $in: patient.tests } });
  res.status(200).json(tests);
});
