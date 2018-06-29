{Container} = require './Container'
{Registrar} = require './Registrar'
{ContextBuilder} = require './ContextBuilder'
{noop, array_wrap, is_function, getDeps} = require './utils'

container = Container.getInstance()

register = (singleton, abstract, args...) ->
  registrar = new Registrar container, abstract, singleton
  return registrar if args.length < 1
  [deps, factory] = args
  if not Array.isArray deps
    factory = deps
    deps = []
    registrar
        .deps deps
        .factory factory

exports.bind = (args...) -> register false, args...

exports.singleton = (args...) -> register true, args...

exports.instance = (args...) -> container.instance args...

exports.extend = (args...) -> container.extend args...

exports.wrap = wrap = (deps = [], factory = noop) ->
  (args...) ->
    if not Array.isArray deps
      factory = deps
      deps = getDeps factory
      injections = resolve deps
    factory injections..., args...

exports.resolve = resolve = (deps = []) -> container.resolveDeps array_wrap deps

exports.make = (abstract) -> container.make abstract

exports.when = (abstract) ->
  new ContextBuilder container, container.getAlias abstract

container.instance 'container', container
