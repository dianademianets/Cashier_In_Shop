import {ActionEnum} from '../constants';

export const htmlTemplates: {[index: string]: {subject: string, templateFileName: string}} = {
  [ActionEnum.CASHIER_REGISTER]: {
    subject: 'Вітаємо',
    templateFileName: 'user-welcome'
  },
  [ActionEnum.FORGOT_PASSWORD]: {
    subject: 'Співчуваємо',
    templateFileName: 'forgot-password'
  }
};
