{Registrar} = require './Registrar'
{ContextBuilder} = require './ContextBuilder'
{
  noop,
  getDeps,
  attachKey,
  getDICKey,
  array_wrap,
  is_function,
  generateDICKey
} = require './utils'

cleanDependencies = (dependencies) ->
  array_wrap(dependencies).map (dependency) -> getDICKey(dependency) or dependency

register = (container, singleton, abstract, args...) ->
  [deps, factory] = args

  if Array.isArray abstract
    [deps, factory] = [abstract, deps]
    abstract = attachKey factory
  if is_function abstract
    deps = getDeps abstract
    factory = abstract
    abstract = attachKey factory
  registrar = new Registrar container, abstract, singleton
  if getDICKey factory or noop
    return registrar.deps(cleanDependencies deps).factory factory
  return registrar if args.length < 1

  if not Array.isArray deps
    factory = deps
    deps = cleanDependencies getDeps(factory)
    registrar
        .deps deps
        .factory factory


class Context
  constructor: (@_container) ->

  bind: (args...) -> register @_container, false, args...

  singleton: (args...) -> register @_container, true, args...

  instance: (args...) ->
    [abstract, instance] = args
    abstract = getDICKey(abstract) or attachKey(abstract) if is_function(abstract)
    @_container.instance abstract, instance

  extend: (args...) ->
    [abstract, callback] = args
    abstract = getDICKey(abstract) or attachKey(abstract) if is_function abstract
    @_container.extend abstract, callback

  wrap: (deps = [], factory = noop) ->
    (args...) =>
      [deps, factory] = [[], deps] if is_function deps
      deps.unshift ...getDeps factory
      injections = @resolve cleanDependencies deps
      factory injections..., args...

  resolve: (deps = []) -> @_container.resolveDeps array_wrap deps

  make: (abstract) ->
    @_container.make getDICKey(abstract) or abstract

  when: (abstract) ->
    new ContextBuilder @_container, @_container.getAlias getDICKey(abstract) or abstract


exports.Context = Context
