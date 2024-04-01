const { check } = require("express-validator"); // this is middleware validation help us to catch error before start buisnis logic
const validatorMiddleWare = require("../../middleware/validationMiddleware");

const typeEnum = [
  "blood_pressure",
  "respiratory_rate",
  "blood_oxygen_level",
  "heartbeat_rate",
];

exports.createRecordValidator = [
  check("type")
    .notEmpty()
    .isIn(typeEnum)
    .withMessage(
      "type mus on of this : blood_pressure , respiratory_rate ,blood_oxygen_level,heartbeat_rate"
    ),
  check("reading")
    .notEmpty()
    .withMessage("readaing is required")
    .isLength({ min: 10 })
    .withMessage("Too short readaing ")
    .isLength({ max: 100 })
    .withMessage("Too long readaing"),
  validatorMiddleWare,
];

//Specific Record For Specific Patient Validator
exports.getRecordByIdValidator = [
  check("id").isMongoId().withMessage("Invalid Record ID"),
  validatorMiddleWare,
];

//Update Record For Specific Patient Validator
exports.UpdateRecordValidator = [
  check("id").isMongoId().withMessage("Invalid Record ID"),
  check("type")
    .notEmpty()
    .isIn(typeEnum)
    .withMessage(
      "type mus on of this : blood_pressure , respiratory_rate ,blood_oxygen_level,heartbeat_rate"
    ),
  check("reading")
    .notEmpty()
    .withMessage("readaing is required")
    .isLength({ min: 10 })
    .withMessage("Too short readaing ")
    .isLength({ max: 100 })
    .withMessage("Too long readaing"),
  validatorMiddleWare,
];

//Delete Record For Specific Patient Validator
exports.deleteRecordByIdValidator = [
  check("id").isMongoId().withMessage("Invalid Record ID"),
  validatorMiddleWare,
];
