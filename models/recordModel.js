const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    date: { type: String, default: new Date().toLocaleString() },
    type: {
      type: String,
      enum: [
        "blood_pressure",
        "respiratory_rate",
        "blood_oxygen_level",
        "heartbeat_rate",
      ],
      required: true,
    },
    reading: { type: String, required: true },
  },
  { timestamps: true }
);

const recordModel = mongoose.model("records", recordSchema);
module.exports = recordModel;
