import {NextFunction, Response} from 'express';

import {ICashRegister, IRequestExtended} from '../../models';
import {cashRegisterService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';
import {ActionEnum, ResponseStatusCodesEnum} from '../../constants';
import { tokinizer} from '../../helpers';

class CashRegisterController {
  async createCashRegister(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const cashRegister = req.body as ICashRegister;

      const {_id} = await cashRegisterService.createCashRegister(cashRegister);
      const {access_token} = tokinizer(ActionEnum.CASH_REGISTER);

      await cashRegisterService.addActionToken(_id, {action: ActionEnum.CASH_REGISTER, token: access_token});
      res.sendStatus(ResponseStatusCodesEnum.CREATED);

    } catch (e) {
      next(e);
    }
  }

  async getAllCashRegister(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const cashRegister = await cashRegisterService.getAllCashRegister(req.query);
      if (!cashRegister) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
      }
      res.json(cashRegister);
    } catch (e) {
      next(e);
    }
  }
}

export const cashRegisterController = new CashRegisterController();
