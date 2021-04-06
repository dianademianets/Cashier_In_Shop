import {Document, Model, model, Schema} from 'mongoose';

import {IAccessToken} from '../../models';
import {TableNamesEnum} from '../../constants';

export type AccessTokenType = IAccessToken & Document

export const AccessTokenSchema: Schema = new Schema<IAccessToken>({
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  cashierId: {
    type: Schema.Types.ObjectId,
    ref: TableNamesEnum.CASHIER
  },
  cashRegisterId: {
    type: Schema.Types.ObjectId,
    ref: TableNamesEnum.CASHREGISTER
  }
}, {
  timestamps: true
});

export const AccessTokenModel: Model<AccessTokenType> = model<AccessTokenType>(TableNamesEnum.ACCESS_TOKEN, AccessTokenSchema);
