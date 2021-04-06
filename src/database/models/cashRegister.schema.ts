import {Document, Model, model, Schema} from 'mongoose';

import {ICashRegister} from '../../models';
import {TableNamesEnum} from '../../constants';

export type CashRegisterType = ICashRegister & Document

export const CashRegisterSchema: Schema = new Schema<ICashRegister>({

  sum: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

export const CashRegisterModel: Model<CashRegisterType> = model<CashRegisterType>(TableNamesEnum.CASHREGISTER, CashRegisterSchema);
