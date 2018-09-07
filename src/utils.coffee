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
  return [] if is_nil v
  str = v.toString()
  match = str.match typehintRE
  if match and match[1] then match[1].split(',').map (v) -> v.trim() else []

NEXT_KEY = 0
CONTAINER_KEY = '__$DICJS$__'
exports.getDICKey = (callback) -> callback[CONTAINER_KEY]
exports.generateDICKey = generateDICKey = -> "#{CONTAINER_KEY}-#{NEXT_KEY++}"
exports.attachKey = (factory) ->
  key = factory[CONTAINER_KEY] = generateDICKey() if not key = factory[CONTAINER_KEY]
  key
