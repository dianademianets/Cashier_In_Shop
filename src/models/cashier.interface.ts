import {ActionEnum} from '../constants';

export interface ICashierToken {
    token?: string,
    action?: ActionEnum
}

export interface ICashier {
    _id: string;
    name: string;
    email: string;
    password: string;
    experience: string;
    zmina_work: string;
    cash_register: string;
    other_job: string;
    address_work: string;
    days_work: string;
    status: string;
    tokens?: [ICashierToken];
    createdAt: string;
}

