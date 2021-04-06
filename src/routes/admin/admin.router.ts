import { Router } from 'express';

const router = Router();
const { isStoreExistsMiddleware } = require('../../middleware');

router.use('/:storeId', isStoreExistsMiddleware);
export const adminRouter = router;
