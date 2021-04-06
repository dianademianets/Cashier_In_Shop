import * as Joi from 'joi';

export const cashRegisterValidator = Joi.object({
  sum: Joi.number().min(0).required()
});
