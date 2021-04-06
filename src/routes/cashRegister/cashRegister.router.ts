import { Router } from 'express';

import {cashRegisterController } from '../../controller';

const router = Router();

router.get('/cashRegister', cashRegisterController.getAllCashRegister);
router.get('/', cashRegisterController.createCashRegister);

export const cashRegisterRouter = router;
