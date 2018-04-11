exports.noop = ->

exports.is_nil = is_nil = (v) -> v is null or v is undefined

exports.is_object = (v) -> typeof v is 'object'

exports.is_function = is_function = (v) -> typeof v is 'function'

exports.array_wrap = (v) ->
    return [] if is_nil v
    if not Array.isArray v then [v] else v

exports.wrap_func = (v) -> if is_function(v) then v else -> v
