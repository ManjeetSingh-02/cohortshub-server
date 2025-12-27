// class to standardize API responses
export class APIResponse {
  constructor(statusCode, response = { message: 'Success', data: null }) {
    this.success = true;
    this.statusCode = statusCode;
    this.response = response;
  }
}

// class to standardize API Errors
export class APIError extends Error {
  constructor(statusCode, error = { type, message, issues: null }, stack = null) {
    super('Something went wrong');
    this.success = false;
    this.statusCode = statusCode;
    this.error = error;
    // if stack is present, use it, else capture the stack trace
    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}
