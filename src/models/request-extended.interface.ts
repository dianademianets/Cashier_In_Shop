import {Request} from 'express';

import {ICashier} from './cashier.interface';
import {IStore} from './store.interface';
import {ICash} from './cashRegister.interface';

export interface IRequestExtended extends Request{
    cashier?: ICashier
    store?: IStore
    cash?: ICash
}
