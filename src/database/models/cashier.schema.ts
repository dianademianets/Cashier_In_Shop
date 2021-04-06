import {Document, Model, model, Schema} from 'mongoose';

import {ICashier} from '../../models';
import {TableNamesEnum} from '../../constants';

export type CashierType = ICashier & Document;

const tokenSubModel = {
  token: String,
  action: String
};

export const CashierSchema: Schema = new Schema<ICashier>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  cash_register:{
    type: Number,
    required: true
  },
  other_job:{
    type: String,
    required: false
  },
  zmina_work: {
    type: String,
    required: false
  },
  days_work: {
    type: String,
    required: false
  },
  address_work: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: true
  },
  tokens: [tokenSubModel]
}, {
  timestamps: true
});

export const CashierModel: Model<CashierType> = model<CashierType>(TableNamesEnum.CASHIER, CashierSchema);
