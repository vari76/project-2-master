const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  test_id: {
    type: String,
  },
  date_tested: {
    type: String,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: { type: String, required: true },

  email: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    required: true,
  },

  address: { type: String, required: true },

  sex: { type: String, required: true },

  date_of_birth: {
    type: String,
  },
  conditions: [String],

  tests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Test" }],
});

const patientModel = mongoose.model("patients", patientSchema);
module.exports = patientModel;
