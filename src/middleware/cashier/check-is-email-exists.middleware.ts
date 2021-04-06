import {NextFunction, Request, Response} from 'express';

import {cashierService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';
import {ResponseStatusCodesEnum} from '../../constants';

export const checkIsEmailExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
  const {email} = req.body;
  const cashierByEmail = await cashierService.findOneByParams({email});

  if (cashierByEmail) {
    return next(new ErrorHandler(
      ResponseStatusCodesEnum.BAD_REQUEST,
      customErrors.BAD_REQUEST_CASHIER_REGISTERED.message,
      customErrors.BAD_REQUEST_CASHIER_REGISTERED.code
    ));
  }

  next();
};
