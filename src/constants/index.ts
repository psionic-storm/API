export const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NO_TOKEN: 401,
  NOT_FOUND: 404,
  NO_PERMISSION: 403,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

export const ERROR_CODE = {
  DUPLICATE_ID: 'duplicate_id',
};

export const ERROR_MSG = {
  DUPLICATE_ID: 'ID already exists',
};

export const ERROR_JSON = {
  DUPLICATE_ID: {
    error: { status: ERROR_CODE.DUPLICATE_ID, message: ERROR_MSG.DUPLICATE_ID },
  },
};
