import * as Joi from 'joi';

import { RegExpEnum } from '../../constants';

export const newCashierValidator = Joi.object({
  experience: Joi.number().integer().min(1).max(100)
    .required(),
  email: Joi.string().trim().regex(RegExpEnum.email).required(),
  days_work: Joi.string().trim().allow('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday').required(),
  other_job: Joi.string().trim().min(2).max(50)
    .required(),
  name: Joi.string().trim().min(2).max(25)
    .required(),
  password: Joi.string().trim().regex(RegExpEnum.password).required(),
  address_work: Joi.string().trim().min(2).max(200)
    .required(),
  surname: Joi.string().trim().min(2).max(50)
    .required()
});
