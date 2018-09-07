{Container} = require './Container'
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

container = Container.getInstance()
cleanDependencies = (dependencies) ->
  array_wrap(dependencies).map (dependency) -> getDICKey(dependency) or dependency

register = (singleton, abstract, args...) ->
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

exports.bind = (args...) -> register false, args...

exports.singleton = (args...) -> register true, args...

exports.instance = (args...) ->
  [abstract, instance] = args
  abstract = getDICKey(abstract) or attachKey(abstract) if is_function(abstract)
  container.instance abstract, instance

exports.extend = (args...) ->
  [abstract, callback] = args
  abstract = getDICKey(abstract) or attachKey(abstract) if is_function abstract
  container.extend abstract, callback

exports.wrap = wrap = (deps = [], factory = noop) ->
  (args...) ->
    [deps, factory] = [[], deps] if is_function deps
    deps.unshift ...getDeps factory
    injections = resolve cleanDependencies deps
    factory injections..., args...

exports.resolve = resolve = (deps = []) -> container.resolveDeps array_wrap deps

exports.make = (abstract) ->
  container.make getDICKey(abstract) or abstract

exports.when = (abstract) ->
  new ContextBuilder container, container.getAlias getDICKey(abstract) or abstract

container.instance 'container', container
