const { check } = require("express-validator"); // this is middleware validation help us to catch error before start buisnis logic
const validatorMiddleWare = require("../../middleware/validationMiddleware");

//create patient validator
exports.createPatientValidator = [
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("Too short  name ")
    .isLength({ max: 30 })
    .withMessage("Too long  name"),
  check("address")
    .notEmpty()
    .withMessage("address is required")
    .isLength({ min: 3 })
    .withMessage("Too short address ")
    .isLength({ max: 30 })
    .withMessage("Too long address"),
  check("mobile")
    .notEmpty()
    .withMessage("mobile is required")
    .isLength({ min: 10 })
    .withMessage("Too short mobile ")
    .isLength({ max: 10 })
    .withMessage("Too long mobile"),
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid Email Format")
    .isLength({ min: 3 })
    .withMessage("Too short email ")
    .isLength({ max: 30 })
    .withMessage("Too long email"),
  check("birthdate")
    .notEmpty()
    .withMessage("birthdate is required")
    .isLength({ min: 3 })
    .withMessage("Too short birthdate ")
    .isLength({ max: 30 })
    .withMessage("Too long birthdate"),
  check("gender")
    .notEmpty()
    .withMessage("gender is required")
    .isLength({ min: 3 })
    .withMessage("Too short gender ")
    .isLength({ max: 30 })
    .withMessage("Too long gender"),
  validatorMiddleWare,
];

//Get  patient By ID validator
exports.getpatientByIdValidator = [
  check("id").isMongoId().withMessage("invalid patient id"),
  validatorMiddleWare,
];

//Delete  patient By ID validator
exports.deletepatientByIdValidator = [
  check("id").isMongoId().withMessage("invalid patient id"),
  validatorMiddleWare,
];

//Update patient validator
exports.updatePatientValidator = [
  check("id").isMongoId().withMessage("invalid patient id"),
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("Too short  name ")
    .isLength({ max: 30 })
    .withMessage("Too long  name"),
  check("address")
    .notEmpty()
    .withMessage("address is required")
    .isLength({ min: 3 })
    .withMessage("Too short address ")
    .isLength({ max: 30 })
    .withMessage("Too long address"),
  check("mobile")
    .notEmpty()
    .withMessage("mobile is required")
    .isLength({ min: 10 })
    .withMessage("Too short mobile ")
    .isLength({ max: 10 })
    .withMessage("Too long mobile"),
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid Email Format")
    .isLength({ min: 3 })
    .withMessage("Too short email ")
    .isLength({ max: 30 })
    .withMessage("Too long email"),
  check("birthdate")
    .notEmpty()
    .withMessage("birthdate is required")
    .isLength({ min: 3 })
    .withMessage("Too short birthdate ")
    .isLength({ max: 30 })
    .withMessage("Too long birthdate"),
  check("gender")
    .notEmpty()
    .withMessage("gender is required")
    .isLength({ min: 3 })
    .withMessage("Too short gender ")
    .isLength({ max: 30 })
    .withMessage("Too long gender"),
  validatorMiddleWare,
];
