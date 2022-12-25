import joi from 'joi';

const signupSchema = joi.object({
  name: joi.string().required().min(3),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.any().valid(joi.ref('password')).required()

});

export default signupSchema;