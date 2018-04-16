class BaseError extends Error
    constructor: (args...) ->
        super args...
        Error.captureStackTrace @, @.constructor if Error.captureStackTrace

    setBaseError: (err) ->
        while err
            prev = err
            err = err.baseError
        @baseError = if err then err else prev

class NotFoundError extends BaseError

class ResolveError extends BaseError
    constructor: (msg = '', deps = []) ->
        super msg
        @dependencies = deps

exports.NotFoundError = NotFoundError

exports.ResolveError = ResolveError
