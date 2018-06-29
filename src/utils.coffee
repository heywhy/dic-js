# coffeelint: disable=no_empty_functions
exports.noop = ->
# coffeelint: disable=no_empty_functions

exports.is_nil = is_nil = (v) -> v is null or v is undefined

exports.is_object = (v) -> typeof v is 'object'

exports.is_function = is_function = (v) -> typeof v is 'function'

exports.array_wrap = (v) ->
  return [] if is_nil v
  if not Array.isArray v then [v] else v

exports.wrap_func = (v) -> if is_function v then v else -> v


typehintRE = /\/\*\s*@container\(([a-z0-9,\s]+)\)\s*\*\//i

exports.getDeps = (v) ->
  str = v.toString()
  match = str.match typehintRE
  if match and match[1] then match[1].split(',').map (v) -> v.trim() else []
