import { Router } from 'express';
import { authController } from '../../controller';
import {
  checkAccessTokenMiddleware,
  checkIsCashierConfirmedMiddleware,
  checkIsCashierExistByEmailMiddleware,
  emailPasswordValidatorMiddleware
} from '../../middleware';

const router = Router();

router.post(
  '/',
  emailPasswordValidatorMiddleware,
  checkIsCashierExistByEmailMiddleware,
  checkIsCashierConfirmedMiddleware,
  authController.authCashier
);
router.post('/logout', checkAccessTokenMiddleware, authController.logoutCashier);

export const authRouter = router;
