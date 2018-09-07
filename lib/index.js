var Container, ContextBuilder, Registrar, array_wrap, attachKey, cleanDependencies, container, generateDICKey, getDICKey, getDeps, is_function, noop, register, resolve, wrap;

({Container} = require('./Container'));

({Registrar} = require('./Registrar'));

({ContextBuilder} = require('./ContextBuilder'));

({noop, getDeps, attachKey, getDICKey, array_wrap, is_function, generateDICKey} = require('./utils'));

container = Container.getInstance();

cleanDependencies = function(dependencies) {
  return array_wrap(dependencies).map(function(dependency) {
    return getDICKey(dependency) || dependency;
  });
};

register = function(singleton, abstract, ...args) {
  var deps, factory, registrar;
  [deps, factory] = args;
  if (Array.isArray(abstract)) {
    [deps, factory] = [abstract, deps];
    abstract = attachKey(factory);
  }
  if (is_function(abstract)) {
    deps = getDeps(abstract);
    factory = abstract;
    abstract = attachKey(factory);
  }
  registrar = new Registrar(container, abstract, singleton);
  if (getDICKey(factory || noop)) {
    return registrar.deps(cleanDependencies(deps)).factory(factory);
  }
  if (args.length < 1) {
    return registrar;
  }
  if (!Array.isArray(deps)) {
    factory = deps;
    deps = cleanDependencies(getDeps(factory));
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
  var abstract, instance;
  [abstract, instance] = args;
  if (is_function(abstract)) {
    abstract = getDICKey(abstract) || attachKey(abstract);
  }
  return container.instance(abstract, instance);
};

exports.extend = function(...args) {
  var abstract, callback;
  [abstract, callback] = args;
  if (is_function(abstract)) {
    abstract = getDICKey(abstract) || attachKey(abstract);
  }
  return container.extend(abstract, callback);
};

exports.wrap = wrap = function(deps = [], factory = noop) {
  return function(...args) {
    var injections;
    if (is_function(deps)) {
      [deps, factory] = [[], deps];
    }
    deps.unshift(...getDeps(factory));
    injections = resolve(cleanDependencies(deps));
    return factory(...injections, ...args);
  };
};

exports.resolve = resolve = function(deps = []) {
  return container.resolveDeps(array_wrap(deps));
};

exports.make = function(abstract) {
  return container.make(getDICKey(abstract) || abstract);
};

exports.when = function(abstract) {
  return new ContextBuilder(container, container.getAlias(getDICKey(abstract) || abstract));
};

container.instance('container', container);
