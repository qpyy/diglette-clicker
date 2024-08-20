class CustomError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
    this.name = this.constructor.name;
  };
};

class AuthenticationError extends CustomError {
  constructor(message, code = 'AUTHENTICATION_ERROR') {
    return super(message, 401, code);
  };
};

class VerifyError extends CustomError {
  constructor(message, code = 'VERIFY_ERROR') {
    return super(message, 402, code);
  };
};

class AuthorizationError extends CustomError {
  constructor(message, code = 'AUTHORIZATION_ERROR') {
    return super(message, 403, code);
  };
};

class ValidationError extends CustomError {
  constructor(message, code = 'VALIDATION_ERROR') {
    return super(message, 400, code);
  };
};

class SendMailError extends CustomError {
  constructor(message, code = 'ERROR SEND MAIL') {
    return super(message, 500, code);
  };
};

class NotFoundError extends CustomError {
  constructor(message, code = 'NOT_FOUND_ERROR') {
    return super(message, 404, code);
  };
};

class InternalServerError extends CustomError {
  constructor(message, code = 'INTERNAL_SERVER_ERROR') {
    return super(message, 500, code);
  };
};

class BadRequestError extends CustomError {
  constructor(message, code = 'BAD_REQUEST_ERROR') {
    return super(message, 400, code);
  };
};

class UnprocessableEntityError extends CustomError {
  constructor(message, code = 'UNPROCESSABLE_ENTITY_ERROR') {
    return super(message, 422, code);
  };
};

class ForbiddenError extends CustomError {
  constructor(message, code = 'FORBIDDEN_ERROR') {
    return super(message, 403, code);
  };
};

module.exports = {
  AuthenticationError,
  AuthorizationError,
  ValidationError,
  NotFoundError,
  InternalServerError,
  BadRequestError,
  UnprocessableEntityError,
  ForbiddenError,
  SendMailError,
  VerifyError
};