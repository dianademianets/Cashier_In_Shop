export const customErrors = {
  // 400
  BAD_REQUEST_CASHIER_REGISTERED: {
    message: 'User is already registered',
    code: 4001
  },
  BAD_REQUEST_CASHIER_ACTIVATED: {
    message: 'User is already activated',
    code: 4002
  },

  BAD_REQUEST_NO_TOKEN: {
    message: 'Token is not present'
  },
  BAD_REQUEST_NO_STOCK: {
    message: 'Stock count is zero'
  },
  BAD_REQUEST_WRONG_PRODUCT_COUNT: {
    message: 'Wrong cashRegister count'
  },

  BAD_REQUEST_NOT_VALID_FILE: {
    message: 'Not valid file'
  },

  // 401
  UNAUTHORIZED_BAD_TOKEN: {
    message: 'Something wrong with token'
  },

  // 403
  FORBIDDEN_CASHIER_NOT_CONFIRMED: {
    message: 'User is not confirmed',
    code: 4031
  },

  // 404
  NOT_FOUND: {
    message: 'Record not found'

  }
};
