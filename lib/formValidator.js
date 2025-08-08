const { body, validationResult } = require("express-validator");

const MAX_LENGTH = 20;
const alphabetsOnly = "should only contain letters";
const maxLetters = `should contain a maximum of ${MAX_LENGTH} letters`;

const validateSignup = [
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage(`Username should contain letters and numbers only.`)
    .isLength({ max: MAX_LENGTH })
    .withMessage(
      `Username should contain a maximum of ${MAX_LENGTH} characters.`
    ),
  body("firstname")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphabetsOnly}.`)
    .isLength({ max: MAX_LENGTH })
    .withMessage(`First name ${maxLetters}.`),
  body("lastname")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphabetsOnly}.`)
    .isLength({ max: MAX_LENGTH })
    .withMessage(`Last name ${maxLetters}.`),
  body("password")
    .isLength({ min: 8 })
    .withMessage(`Password must contain a minimum of 8 characters.`),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(
      `Password and confirmation password are not equal to each other.`
    ),
];

const validateMessage = [
  body("message")
    .isLength({ max: 500 })
    .withMessage(`Message cannot be longer than 500 characters.`),
];

module.exports = { validateSignup, validateMessage };
