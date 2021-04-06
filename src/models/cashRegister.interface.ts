import {ActionEnum, CashRegisterStatusEnum} from '../constants';

export interface ICashRegisterToken {
    token?: string,
    action?: ActionEnum
}
export interface ICashRegister {
    status: CashRegisterStatusEnum
    _id: string;
    sum: string;
    createdAt: string;
    updatedAt: string;
}
