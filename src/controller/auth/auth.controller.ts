import {NextFunction, Request, Response} from 'express';

import {ICashier, IRequestExtended} from '../../models';
import {comparePassword, tokinizer} from '../../helpers';
import {ActionEnum, RequestHeadersEnum, ResponseStatusCodesEnum} from '../../constants';
import {authService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';

class AuthController {
  async authCashier(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {_id, password} = req.cashier as ICashier;
      const authInfo = req.body;
      const isPasswordEquals = await comparePassword(authInfo.password, password);

      if (!isPasswordEquals) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
      }

      const {access_token, refresh_token} = tokinizer(ActionEnum.CASHIER_AUTH);

      await authService.createTokenPair({
        accessToken: access_token,
        refreshToken: refresh_token,
        cashierId: _id
      });

      res.json({access_token, refresh_token});
    } catch (e) {
      return next(e);
    }
  }

  async logoutCashier(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.get(RequestHeadersEnum.AUTHORIZATION);

    await authService.removeToken({accessToken});

    res.sendStatus(ResponseStatusCodesEnum.NO_CONTENT);
  }
}

export const authController = new AuthController();
