import {NextFunction, Response} from 'express';

import {cashierService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';
import {ResponseStatusCodesEnum} from '../../constants';
import {IRequestExtended} from '../../models';

export const checkIsCashierExistByEmailMiddleware =
    async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void | NextFunction> => {
      const {email} = req.body;
      const cashierByEmail = await cashierService.findOneByParams({email});

      if (!cashierByEmail) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
      }

      req.cashier = cashierByEmail;
      next();
    };
