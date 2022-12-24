import joi from 'joi';

const urlSchema = joi.object({
  email: joi.string().required(),
});

export default urlSchema;