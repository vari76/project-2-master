const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  category: { type: String, required: true },
  date: { type: String, required: true },
  nurse_name: { type: String, required: true },
  readings: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function (value) {
        if (this.category === "BloodPressure") {
          return (
            typeof value.systolic === "number" &&
            typeof value.diastolic === "number"
          );
        } else if (this.category === "Heartbeat") {
          return typeof value.bpm === "number";
        } else if (this.category === "BloodOxygenLevel") {
          return typeof value.percentage === "number";
        } else {
          return true;
        }
      },
      message: "Readings must match the expected format for the test category",
    },
  },
});

module.exports = mongoose.model("Test", TestSchema);
