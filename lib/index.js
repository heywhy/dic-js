var Container, ContextBuilder, Registrar, array_wrap, container, getDeps, is_function, noop, register, resolve, wrap;

({Container} = require('./Container'));

({Registrar} = require('./Registrar'));

({ContextBuilder} = require('./ContextBuilder'));

({noop, array_wrap, is_function, getDeps} = require('./utils'));

container = Container.getInstance();

register = function(singleton, abstract, ...args) {
  var deps, factory, registrar;
  registrar = new Registrar(container, abstract, singleton);
  if (args.length < 1) {
    return registrar;
  }
  [deps, factory] = args;
  if (!Array.isArray(deps)) {
    factory = deps;
    deps = [];
    return registrar.deps(deps).factory(factory);
  }
};

exports.bind = function(...args) {
  return register(false, ...args);
};

exports.singleton = function(...args) {
  return register(true, ...args);
};

exports.instance = function(...args) {
  return container.instance(...args);
};

exports.extend = function(...args) {
  return container.extend(...args);
};

exports.wrap = wrap = function(deps = [], factory = noop) {
  return function(...args) {
    var injections;
    if (!Array.isArray(deps)) {
      factory = deps;
      deps = getDeps(factory);
      injections = resolve(deps);
    }
    return factory(...injections, ...args);
  };
};

exports.resolve = resolve = function(deps = []) {
  return container.resolveDeps(array_wrap(deps));
};

exports.make = function(abstract) {
  return container.make(abstract);
};

exports.when = function(abstract) {
  return new ContextBuilder(container, container.getAlias(abstract));
};

container.instance('container', container);
