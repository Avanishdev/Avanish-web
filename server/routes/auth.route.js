const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth.controller.js")
const { signupSchema } = require("../validators/auth.validator.js")
const { signinSchema } = require("../validators/auth.validator.js")
const validate = require("../middlewares/validate.middleware.js")

router.route("/register").post(validate(signupSchema), authController.register)
router.route("/login").post(validate(signinSchema), authController.login)

module.exports = router;