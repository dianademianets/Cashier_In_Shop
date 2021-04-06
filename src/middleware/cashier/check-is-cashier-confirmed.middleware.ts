import {NextFunction, Response} from 'express';

import {customErrors, ErrorHandler} from '../../errors';
import {CashierStatusEnum, ResponseStatusCodesEnum} from '../../constants';
import {ICashier, IRequestExtended} from '../../models';

export const checkIsCashierConfirmedMiddleware =
    (req: IRequestExtended, res: Response, next: NextFunction): void | NextFunction => {
      const {status} = req.cashier as ICashier;

      if (status !== CashierStatusEnum.CONFIRMED) {
        return next(new ErrorHandler(
          ResponseStatusCodesEnum.FORBIDDEN,
          customErrors.FORBIDDEN_CASHIER_NOT_CONFIRMED.message,
          customErrors.FORBIDDEN_CASHIER_NOT_CONFIRMED.code
        ));
      }

      next();
    };
