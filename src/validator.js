const Joi = require("joi");

const schema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  annualSalary: Joi.number()
    .integer()
    .required(),
  superRate: Joi.string().regex(/\d+(\.\d+)?%/),
  paymentStartDate: Joi.string().required()
});

const validate = Joi.validate;

module.exports = {
  schema,
  validate
};
