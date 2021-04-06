import {NextFunction, Request, Response} from 'express';

import {ActionEnum, CashierStatusEnum, LogEnum, RequestHeadersEnum, ResponseStatusCodesEnum} from '../../constants';
import {hashPassword, tokinizer} from '../../helpers';
import {cashierService, emailService, logService} from '../../services';
import {ICashier, IRequestExtended} from '../../models';
import {customErrors, ErrorHandler} from '../../errors';

class CashierController {
  async getAllCashiers(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const cashiers = await cashierService.getAllCashiers(req.query);
      if (!cashiers) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
      }
      res.json(cashiers);
    } catch (e) {
      next(e);
    }
  }

  async getTargetCashiers1(req: Request, res: Response, next: NextFunction) {
    try {
      const {experience, other_job} = req.body as ICashier;

      if (!experience || !other_job) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
      }
      const cashier = await cashierService.getTargetCashiers1({experience, other_job});

      if (!cashier) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
      }

      res.json(cashier);
    } catch (e) {
      next(e);
    }
  }

  async getTargetCashiers2(req: Request, res: Response, next: NextFunction) {
    try {
      const {address_work, zmina_work, days_work, cash_register} = req.body as ICashier;

      if (!address_work || !zmina_work || !days_work || !cash_register) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
      }
      const cashier = await cashierService.getTargetCashiers2({
        address_work,
        zmina_work,
        days_work,
        cash_register
      });

      if (!cashier) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
      }

      res.json(cashier);
    } catch (e) {
      next(e);
    }
  }

  async createCashier(req: Request, res: Response, next: NextFunction) {
    try {
      const cashier = req.body as ICashier;

      cashier.password = await hashPassword(cashier.password);

      const {_id} = await cashierService.createCashier(cashier);
      const {access_token} = tokinizer(ActionEnum.CASHIER_REGISTER);

      await cashierService.addActionToken(_id, {action: ActionEnum.CASHIER_REGISTER, token: access_token});
      await emailService.sendEmail(cashier.email, ActionEnum.CASHIER_REGISTER, {token: access_token});
      await logService.createLog({event: LogEnum.CASHIER_REGISTERED, cashierId: _id});

      res.sendStatus(ResponseStatusCodesEnum.CREATED);

    } catch (e) {
      next(e);
    }
  }

  async confirmCashier(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id, status, tokens = []} = req.cashier as ICashier;
    const tokenToDelete = req.get(RequestHeadersEnum.AUTHORIZATION);

    if (status !== CashierStatusEnum.PENDING) {
      return next(
        new ErrorHandler(
          ResponseStatusCodesEnum.BAD_REQUEST,
          customErrors.BAD_REQUEST_CASHIER_ACTIVATED.message,
          customErrors.BAD_REQUEST_CASHIER_ACTIVATED.code)
      );
    }

    await cashierService.updateCashierByParams({_id}, {status: CashierStatusEnum.CONFIRMED});

    const index = tokens.findIndex(({action, token}) => {
      return token === tokenToDelete && action === ActionEnum.CASHIER_REGISTER;
    });

    if (index !== -1) {
      tokens.splice(index, 1);

      await cashierService.updateCashierByParams({_id}, {tokens} as Partial<ICashier>);
    }

    await logService.createLog({event: LogEnum.CASHIER_CONFIRMED, cashierId: _id});

    res.end();
  }

  async forgotPassword(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {_id, email} = req.cashier as ICashier;
      const {access_token} = tokinizer(ActionEnum.FORGOT_PASSWORD);

      await cashierService.addActionToken(_id, {token: access_token, action: ActionEnum.FORGOT_PASSWORD});
      await emailService.sendEmail(email, ActionEnum.FORGOT_PASSWORD, {token: access_token});
      res.end();
    } catch (e) {
      next(e);
    }
  }

  async setForgotPass(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {_id, tokens = []} = req.cashier as ICashier;
      const {password} = req.body;
      const tokenToDelete = req.get(RequestHeadersEnum.AUTHORIZATION);
      const hashPass = await hashPassword(password);

      await cashierService.updateCashierByParams({_id}, {password: hashPass});

      const index = tokens.findIndex(({action, token}) => {
        return token === tokenToDelete && action === ActionEnum.FORGOT_PASSWORD;
      });

      if (index !== -1) {
        tokens.splice(index, 1);

        await cashierService.updateCashierByParams({_id}, {tokens} as Partial<ICashier>);
      }

      res.end();
    } catch (e) {
      next(e);
    }
  }

}

export const cashierController = new CashierController();
