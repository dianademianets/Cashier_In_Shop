import {NextFunction, Response} from 'express';

import {ActionEnum, RequestHeadersEnum, ResponseStatusCodesEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';
import {cashierService} from '../../services';
import {IRequestExtended} from '../../models';
import {tokinVerificator} from '../../helpers';

export const checkConfirmTokenMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.get(RequestHeadersEnum.AUTHORIZATION);

    if (!token) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NO_TOKEN.message));
    }

    await tokinVerificator(ActionEnum.CASHIER_REGISTER, token);

    const cashierByToken = await cashierService.findCashierByActionToken(ActionEnum.CASHIER_REGISTER, token);

    if (!cashierByToken) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
    }

    req.cashier = cashierByToken;

    next();
  } catch (e) {
    next(e);
  }
};
