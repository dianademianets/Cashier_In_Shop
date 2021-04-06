import {Types} from 'mongoose';
import {CashRegisterModel} from '../../database';
import {ICashRegister,ICashRegisterToken} from '../../models';

class CashRegisterService {
  createCashRegister(cash: Partial<ICashRegister>): Promise<ICashRegister> {
    const cashRegisterToCreate = new CashRegisterModel(cash);

    return cashRegisterToCreate.save();
  }
  addActionToken(cashRegisterId: string, tokenObject: ICashRegisterToken): Promise<ICashRegister> {
    return CashRegisterModel.update(
      {_id: Types.ObjectId(cashRegisterId)}, {$push: {tokens: tokenObject}}).exec();
  }
  getAllCashRegister(findObject: Partial<ICashRegister>): Promise<ICashRegister[]> {
    return CashRegisterModel.find(findObject).exec();
  }
}

export const cashRegisterService = new CashRegisterService();
