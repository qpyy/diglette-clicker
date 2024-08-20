class CustomError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
    this.name = this.constructor.name;
  }
}

class AuthenticationError extends CustomError {
  constructor(message = "Authentication failed", code = "AUTHENTICATION_ERROR") {
    super(message, 401, code);
  }
}

class VerifyError extends CustomError {
  constructor(message = "Verification failed", code = "VERIFY_ERROR") {
    super(message, 402, code);
  }
}

class AuthorizationError extends CustomError {
  constructor(message = "Authorization failed", code = "AUTHORIZATION_ERROR") {
    super(message, 403, code);
  }
}

class ValidationError extends CustomError {
  constructor(message = "Validation error", code = "VALIDATION_ERROR") {
    super(message, 400, code);
  }
}

class SendMailError extends CustomError {
  constructor(message = "Failed to send mail", code = "ERROR_SEND_MAIL") {
    super(message, 500, code);
  }
}

class NotFoundError extends CustomError {
  constructor(message = "Not found", code = "NOT_FOUND_ERROR") {
    super(message, 404, code);
  }
}

class InternalServerError extends CustomError {
  constructor(message = "Internal server error", code = "INTERNAL_SERVER_ERROR") {
    super(message, 500, code);
  }
}

class BadRequestError extends CustomError {
  constructor(message = "Bad request", code = "BAD_REQUEST_ERROR") {
    super(message, 400, code);
  }
}

class UnprocessableEntityError extends CustomError {
  constructor(message = "Unprocessable entity", code = "UNPROCESSABLE_ENTITY_ERROR") {
    super(message, 422, code);
  }
}

class ForbiddenError extends CustomError {
  constructor(message = "Forbidden", code = "FORBIDDEN_ERROR") {
    super(message, 403, code);
  }
}

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
  VerifyError,
};
