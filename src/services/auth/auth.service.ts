import {AccessTokenModel} from '../../database';
import {IAccessToken, ICashier} from '../../models';

class AuthService {
  createTokenPair(tokenObject: Partial<IAccessToken>): Promise<IAccessToken> {
    const tokensToCreate = new AccessTokenModel(tokenObject);

    return tokensToCreate.save();
  }

  async findCashierByToken(findObject: { accessToken?: string, refreshToken?: string }): Promise<ICashier | null> {
    const tokenAndCashier = await AccessTokenModel
      .findOne(findObject)
      .populate('cashierId')
      .select({cashierId: 1, _id: 0}) as any;

    return tokenAndCashier?.cashierId?.toJSON();
  }

  removeToken(removeObject: { accessToken?: string, refreshToken?: string }): Promise<IAccessToken | null> {
    return AccessTokenModel.findOneAndDelete(removeObject).exec();
  }
}

export const authService = new AuthService();
