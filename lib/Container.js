var Container, NotFoundError, ResolveError, array_wrap, buildStack, is_function, is_nil, is_object, noop, wrap_func;

({ResolveError, NotFoundError} = require('./errors'));

({is_nil, is_object, is_function, noop, array_wrap, wrap_func} = require('./utils'));

buildStack = [];

Container = (function() {
  class Container {
    /*
     * sets a global instance, if not exists create it, and return
     *
     * @return {Container}
     */
    static getInstance() {
      if (is_nil(this.instance)) {
        this.instance = new Container;
      }
      return this.instance;
    }

    /*
     * replaces the global instance with the passed instance
     *
     * @param  {Container} instance
     * @return {Container}
     */
    static setInstance(instance1) {
      this.instance = instance1;
      return this.instance;
    }

    /*
     * aliases an abstract defined in the container to allow
     * resolving the abstract using the alias name
     *
     * @param  {string}  abstract
     * @param  {string}  alias
     */
    alias(abstract, alias) {
      var aliases;
      this._aliases[alias] = abstract;
      aliases = this._abstractAliases[abstract] = array_wrap(this._abstractAliases[abstract]);
      return aliases.push(alias);
    }

    /*
     * get the concrete the param is assigned to in case its an
     * alias to abstract in the container
     *
     * @param  {string} abstract
     * @return {string}
     * @throws {Error}
     */
    getAlias(abstract) {
      if (!this._aliases[abstract]) {
        return abstract;
      }
      if (abstract === this._aliases[abstract]) {
        throw new Error(`[${abstract}] is aliased to itself!`);
      }
      return this.getAlias(this._aliases[abstract]);
    }

    /*
     * checks if the given value is an alias to another abstract
     *
     * @param  {string}  abstract
     * @return {boolean}
     */
    isAlias(abstract) {
      return !is_nil(this._aliases[abstract]);
    }

    /*
     * checks if the abstract is a singleton or to be
     * resolved once from the container
     *
     * @param  {string}  abstract
     * @return {boolean}
     */
    isShared(abstract) {
      if (this._instances[abstract] || (this._bindings[abstract] && this._bindings[abstract].shared)) {
        return true;
      }
    }

    /*
     * checks if the given abstract has been bound
     *
     * @param  {string}  abstract
     * @return {boolean}
     */
    bound(abstract) {
      if (this._bindings[abstract] || this._instances[abstract] || this.isAlias(abstract)) {
        return true;
      }
    }

    /*
     * determines if the given abstract has been resolved
     * from the container
     *
     * @param  {string}  abstract
     * @return {boolean}
     */
    resolved(abstract) {
      if (this.isAlias(abstract)) {
        abstract = this.getAlias(abstract);
      }
      return this._resolved[abstract] || this._instances[abstract];
    }

    /*
     * removes the abstract from the container
     *
     * @param  {string}  abstract
     */
    dropStaleInstances(abstract) {
      delete this._instances[abstract];
      return delete this._aliases[abstract];
    }

    /*
     * makes the abstract accessible like its a prop
     * on the container itself
     *
     * @param  {string}  abstract
     */
    bindToContainerProps(abstract) {
      if (!is_nil(this[abstract])) {
        return;
      }
      return Object.defineProperty(this, abstract, {
        configurable: true,
        get: function() {
          return this.make(abstract);
        }
      });
    }

    /*
     * this is the base method which is used all other methods
     * in binding an abstract into the container
     *
     * @param  {string}    abstract
     * @param  {array}     deps
     * @param  {function}  factory
     * @param  {boolean}   shared
     */
    binder(abstract, deps = [], factory = noop, shared = true) {
      this.dropStaleInstances(abstract);
      this._bindings[abstract] = {
        deps,
        shared,
        factory: wrap_func(factory)
      };
      this.bindToContainerProps(abstract);
      if (this.resolved(abstract)) {
        return this.rebound(abstract);
      }
    }

    /*
     * this binds an abstract that should be resolved once
     *
     * @param  {string}    abstract
     * @param  {array}     deps
     * @param  {function}  factory
     */
    singleton(abstract, deps = [], factory = noop) {
      return this.binder(abstract, deps, factory);
    }

    /*
     * {@inherit}
     */
    bind(abstract, deps = [], factory = noop) {
      return this.binder(abstract, deps, factory, false);
    }

    /*
     * removes the abstract if its alias to another abstract type
     *
     * @param  {string}  search
     */
    removeAbstractAlias(search) {
      var abstract, alias, aliases, i, index, len, ref;
      if (is_nil(this._aliases[search])) {
        return;
      }
      ref = this._abstractAliases;
      for (abstract in ref) {
        aliases = ref[abstract];
        for (index = i = 0, len = aliases.length; i < len; index = ++i) {
          alias = aliases[index];
          if (alias === search) {
            aliases.splice(index, 1);
          }
        }
      }
      return null;
    }

    /*
     *
     */
    instance(abstract, instance) {
      this.removeAbstractAlias(abstract);
      delete this._aliases[abstract];
      this._instances[abstract] = instance;
      this.bindToContainerProps(abstract);
      if (this.bound(abstract)) {
        this.rebound(abstract);
      }
      return instance;
    }

    
    getConcrete(abstract) {
      var binding;
      binding = this.getContextualFactory(abstract);
      if (!is_nil(binding)) {
        return binding;
      }
      if (this._bindings[abstract]) {
        return this._bindings[abstract];
      }
    }

    
    getContextualFactory(abstract) {
      var alias, binding, bindings, i, len, ref;
      bindings = this.findInContextualBindings(abstract);
      if (!is_nil(bindings)) {
        return bindings;
      }
      if (is_nil(this._abstractAliases[abstract])) {
        return;
      }
      ref = this._abstractAliases[abstract];
      for (i = 0, len = ref.length; i < len; i++) {
        alias = ref[i];
        if (binding = this.findInContextualBindings(alias)) {
          return binding;
        }
      }
    }

    
    findInContextualBindings(abstract) {
      var context, last;
      last = buildStack[buildStack.length - 1];
      context = this._contextual[last];
      if (context && context[abstract]) {
        return context[abstract];
      }
    }

    
    make(abstract) {
      return this.resolve(abstract);
    }

    
    resolve(abstract) {
      var callback, concrete, context, i, len, ref, val;
      context = this.getContextualFactory(abstract = this.getAlias(abstract));
      if (this._instances[abstract] && !context) {
        return this._instances[abstract];
      }
      concrete = this.getConcrete(abstract);
      val = this.build(abstract, concrete);
      ref = this.getExtenders(abstract);
      for (i = 0, len = ref.length; i < len; i++) {
        callback = ref[i];
        val = callback(val, this);
      }
      if (this.isShared(abstract)) {
        this._instances[abstract] = val;
      }
      this._resolved[abstract] = true;
      return val;
    }

    
    addContextualBinding(concrete, abstract, giver = noop) {
      this._contextual[concrete] = this._contextual[concrete] || {};
      return this._contextual[concrete][this.getAlias(abstract)] = wrap_func(giver);
    }

    
    build(abstract, concrete) {
      var args, deps, err, error, factory;
      if (is_object(concrete)) {
        ({deps, factory} = concrete);
      } else {
        factory = concrete;
      }
      deps = array_wrap(deps);
      if (!is_function(factory)) {
        throw new NotFoundError(`service '${abstract}' not found in the container!`);
      }
      try {
        if (deps && deps.length < 1) {
          return factory(this);
        }
        buildStack.push(abstract);
        args = this.resolveDeps(deps);
        buildStack.pop();
        return factory(...args);
      } catch (error1) {
        error = error1;
        err = new ResolveError(`unable to build service '${abstract}'`, deps);
        err.setBaseError(error);
        throw err;
      }
    }

    
    resolveDeps(deps = []) {
      var dep, i, len, ref, results;
      ref = array_wrap(deps);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        dep = ref[i];
        results.push(this.make(dep));
      }
      return results;
    }

    
    rebound(abstract) {
      var callback, i, instance, len, ref, results;
      instance = this.make(abstract);
      ref = this.getReboundCallbacks(abstract);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        callback = ref[i];
        results.push(callback(this, instance));
      }
      return results;
    }

    
    getReboundCallbacks(abstract) {
      if (Array.isArray(this._reboundCallbacks[abstract])) {
        return this._reboundCallbacks[abstract];
      }
      return [];
    }

    
    rebinding(abstract, callback = noop) {
      var callbacks;
      abstract = this.getAlias(abstract);
      callbacks = this._reboundCallbacks[abstract] = array_wrap(this._reboundCallbacks[abstract]);
      callbacks.push(callback);
      if (this.bound(abstract)) {
        return this.make(abstract);
      }
    }

    
    extend(abstract, callback = noop) {
      var callbacks;
      abstract = this.getAlias(abstract);
      if (this._instances[abstract]) {
        this._instances[abstract] = callback(this._instances[abstract], this);
        return this.rebound(abstract);
      } else {
        callbacks = this._extenders[abstract] = array_wrap(this._extenders[abstract]);
        callbacks.push(callback);
        if (this.resolved(abstract)) {
          return this.rebound(abstract);
        }
      }
    }

    
    getExtenders(abstract) {
      abstract = this.getAlias(abstract);
      if (!is_nil(this._extenders[abstract])) {
        return this._extenders[abstract];
      }
      return [];
    }

    
    forgetExtenders(abstract) {
      return delete this._extenders[this.getAlias(abstract)];
    }

    
    forgetInstance(abstract) {
      return delete this._instances[abstract];
    }

    
    forgetInstances() {
      return this._instances = {};
    }

    
    flush() {
      this._aliases = {};
      this._bindings = {};
      this._resolved = {};
      this._instances = {};
      this._abstractAliases = {};
      return null;
    }

  };

  
  Container.prototype._contextual = {};

  
  Container.prototype._aliases = {};

  
  Container.prototype._abstractAliases = {};

  
  Container.prototype._bindings = {};

  
  Container.prototype._resolved = {};

  
  Container.prototype._instances = {};

  
  Container.prototype._extenders = {};

  
  Container.prototype._reboundCallbacks = {};

  return Container;

}).call(this);

exports.Container = Container;
