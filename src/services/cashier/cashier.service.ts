import {Types} from 'mongoose';

import {CashierModel} from '../../database';
import {ICashier, ICashierToken} from '../../models';
import {ActionEnum} from '../../constants';

class CashierService {
  getAllCashiers(findObject: Partial<ICashier>): Promise<ICashier | any> {
    return CashierModel.find(findObject).exec();
  }

  getTargetCashiers1(findObject: Partial<ICashier>): Promise<ICashier | null> {
    return CashierModel.findOne(findObject).exec();
  }

  getTargetCashiers2(findObject: Partial<ICashier>): Promise<ICashier | null> {
    return CashierModel.findOne(findObject).exec();
  }

  createCashier(cashier: Partial<ICashier>): Promise<ICashier> {
    const cashierToCreate = new CashierModel(cashier);

    return cashierToCreate.save();
  }

  addActionToken(cashierId: string, tokenObject: ICashierToken): Promise<ICashier| any> {
    return CashierModel.update(
      {_id: Types.ObjectId(cashierId)}, {$push: {tokens: tokenObject}}).exec();}

  updateCashierByParams(params: Partial<ICashier>, update: Partial<ICashier>): Promise<ICashier| any> {
    return CashierModel.updateOne(params, update, {new: true}).exec();
  }

  findOneByParams(findObject: Partial<ICashier>): Promise<ICashier | null> {
    return CashierModel.findOne(findObject).exec();
  }

  findCashierByActionToken(action: ActionEnum, token: string): Promise<ICashier | null> {
    return CashierModel.findOne({
      $and: [
        {'tokens.action': action},
        {'tokens.token': token}
      ]
    }) as any;
  }
}

export const cashierService = new CashierService();
