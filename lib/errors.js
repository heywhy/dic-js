var BaseError, NotFoundError, ResolveError;

BaseError = class BaseError extends Error {
  constructor(...args) {
    super(...args);
    if (Error.captureStackTrace) {
      // coffeelint: disable=no_stand_alone_at
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // coffeelint: enable=no_stand_alone_at
  setBaseError(err) {
    var prev;
    while (err) {
      prev = err;
      err = err.baseError;
    }
    return this.baseError = err ? err : prev;
  }

};

NotFoundError = class NotFoundError extends BaseError {};

ResolveError = class ResolveError extends BaseError {
  constructor(msg = '', deps = []) {
    super(msg);
    this.dependencies = deps;
  }

};

exports.NotFoundError = NotFoundError;

exports.ResolveError = ResolveError;
