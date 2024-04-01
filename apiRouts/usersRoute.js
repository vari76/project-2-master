const express = require("express");

const router = express.Router();
const { register, login } = require("../service/userService");

router.route("/").post(register);
router.route("/login").post(login);

module.exports = router;
