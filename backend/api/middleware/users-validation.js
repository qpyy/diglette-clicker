const { body, validationResult } = require('express-validator');

const validationRegistration = [
  body("email")
    .isString()
    .withMessage('The field is not a string')
    .trim()
    .notEmpty()
    .withMessage("The field is empty"),
  body("login")
    .isString()
    .withMessage('The field is not a string')
    .trim()
    .notEmpty()
    .withMessage("The field is empty"),
  body("password")
    .isString()
    .withMessage('The field is not a string')
    .trim()
    .notEmpty()
    .withMessage("The field is empty"),
  validationResult,
]

const validationAuthorization = [
  body("login")
    .isString()
    .withMessage('The field is not a string')
    .trim()
    .notEmpty()
    .withMessage("The field is empty"),
  body("password")
    .isString()
    .withMessage('The field is not a string')
    .trim()
    .notEmpty()
    .withMessage("The field is empty"),
  validationResult,
]

module.exports = { validationRegistration, validationAuthorization };