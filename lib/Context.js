var Context, ContextBuilder, Registrar, array_wrap, attachKey, cleanDependencies, generateDICKey, getDICKey, getDeps, is_function, noop, register;

({Registrar} = require('./Registrar'));

({ContextBuilder} = require('./ContextBuilder'));

({noop, getDeps, attachKey, getDICKey, array_wrap, is_function, generateDICKey} = require('./utils'));

cleanDependencies = function(dependencies) {
  return array_wrap(dependencies).map(function(dependency) {
    return getDICKey(dependency) || dependency;
  });
};

register = function(container, singleton, abstract, ...args) {
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

Context = class Context {
  constructor(_container) {
    this._container = _container;
  }

  bind(...args) {
    return register(this._container, false, ...args);
  }

  singleton(...args) {
    return register(this._container, true, ...args);
  }

  instance(...args) {
    var abstract, instance;
    [abstract, instance] = args;
    if (is_function(abstract)) {
      abstract = getDICKey(abstract) || attachKey(abstract);
    }
    return this._container.instance(abstract, instance);
  }

  extend(...args) {
    var abstract, callback;
    [abstract, callback] = args;
    if (is_function(abstract)) {
      abstract = getDICKey(abstract) || attachKey(abstract);
    }
    return this._container.extend(abstract, callback);
  }

  wrap(deps = [], factory = noop) {
    return (...args) => {
      var injections;
      if (is_function(deps)) {
        [deps, factory] = [[], deps];
      }
      deps.unshift(...getDeps(factory));
      injections = this.resolve(cleanDependencies(deps));
      return factory(...injections, ...args);
    };
  }

  resolve(deps = []) {
    return this._container.resolveDeps(array_wrap(deps));
  }

  make(abstract) {
    return this._container.make(getDICKey(abstract) || abstract);
  }

  when(abstract) {
    return new ContextBuilder(this._container, this._container.getAlias(getDICKey(abstract) || abstract));
  }

};

exports.Context = Context;
