import { Router } from 'express';

import {cashierController} from '../../controller';
import {
  checkConfirmTokenMiddleware,
  checkForgotPassTokenMiddleware,
  checkIsCashierConfirmedMiddleware,
  checkIsCashierExistByEmailMiddleware,
  checkIsCashierValidMiddleware,
  checkIsEmailExistsMiddleware,
  emailValidatorMiddleware,
  singlePasswordValidatorMiddleware
} from '../../middleware';

const router = Router();
router.get('/', cashierController.getAllCashiers);
router.get('/cashier', checkIsCashierValidMiddleware, cashierController.getTargetCashiers1);
router.get('/cashier', checkIsCashierValidMiddleware, cashierController.getTargetCashiers2);
router.post('/', checkIsCashierValidMiddleware, checkIsEmailExistsMiddleware, cashierController.createCashier);
router.post('/confirm', checkConfirmTokenMiddleware,checkIsCashierConfirmedMiddleware, cashierController.confirmCashier);
router.post(
  '/password/forgot',
  emailValidatorMiddleware,
  checkIsCashierExistByEmailMiddleware,
  cashierController.forgotPassword
);
router.post(
  '/password/reset',
  singlePasswordValidatorMiddleware,
  checkForgotPassTokenMiddleware,
  cashierController.setForgotPass
);

export const сashierRouter = router;
