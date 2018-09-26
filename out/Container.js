"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var ContextBuilder_1 = __importDefault(require("./ContextBuilder"));
var Container = /** @class */ (function () {
    function Container() {
        this.with = [];
        /**
         * Build stack.
         */
        this.serviceBuildStack = [];
        /**
         * Aliases map.
         */
        this.aliases = {};
        /**
         * Map holding list of aliases attached to a service.
         */
        this.serviceAliases = {};
        /**
         * Services binded to the container.
         */
        this.services = {};
        /**
         * Holds the value returned by singleton services
         * when resolved the first time.
         */
        this.instances = {};
        /**
         * Holds the list of successfully created services.
         */
        this.resolvedServices = {};
        /**
         * Hold callbacks attached to extend a service functionality.
         */
        this.extenders = {};
        /**
         * Local rebound callbacks
         */
        this.reboundCallbacks = {};
        /**
         * Contextual bindings map.
         */
        this.contextuals = {};
        /**
         * Global resolving callbacks.
         */
        this.globalResolvingCallbacks = [];
        /**
         * This holds callbacks attached to a specific service.
         */
        this.resolvingCallbacks = {};
        /**
         * Local callback to be fired after resolving a
         * service from the container
         */
        this.afterResolvingCallbacks = {};
        /**
         * Global callback to be fired after resolving a
         * service from the container
         */
        this.globalAfterResolvingCallbacks = [];
    }
    /**
     * Return the global instance, if not exists create and return.
     *
     * @returns {Container}
     */
    Container.getInstance = function () {
        if (this.instance == null) {
            this.instance = new this();
        }
        return this.instance;
    };
    /**
     * Set the global instance used in application.
     *
     * @param instance
     */
    Container.setInstance = function (instance) {
        this.instance = instance;
    };
    /**
     * Assign an alias to a service defined in the container
     * to allow resolving the abstract using the alias.
     *
     * @param abstract
     * @param alias
     */
    Container.prototype.alias = function (abstract, alias) {
        abstract = this.getServiceId(abstract);
        this.aliases[alias] = abstract;
        if (!Array.isArray(this.serviceAliases[abstract])) {
            this.serviceAliases[abstract] = [];
        }
        this.serviceAliases[abstract].push(alias);
        this.bindServiceAsProps(alias);
    };
    /**
     * Get the service the alias is attached to.
     *
     * @param alias
     */
    Container.prototype.getAlias = function (alias) {
        var service = this.aliases[alias];
        if (service == null) {
            return alias;
        }
        if (alias === service) {
            throw new Error("[" + alias + " is aliased to itself!]");
        }
        return this.getAlias(service);
    };
    /**
     * Checks if the given value is an alias to a service
     * in the container.
     *
     * @param service
     */
    Container.prototype.isAlias = function (service) {
        return this.aliases[service] != null;
    };
    /**
     * Checks if the given service was binded as a singleton.
     *
     * @param service
     */
    Container.prototype.isShared = function (service) {
        var abstract = this.getAlias(this.getServiceId(service));
        return this.instances[abstract] || (this.services[abstract] && this.services[abstract].shared);
    };
    /**
     * Checks if there is a service in the container with the given name.
     *
     * @param service
     */
    Container.prototype.bound = function (service) {
        service = this.getServiceId(service);
        return this.services[service] != null || this.instances[service] || this.getAlias(service);
    };
    /**
     * {@inheritdoc}
     */
    Container.prototype.has = function (id) {
        return this.bound(id);
    };
    /**
     * Checks if the service has been successfully created by the container.
     *
     * @param service
     */
    Container.prototype.resolved = function (service) {
        service = this.getServiceId(service);
        if (this.isAlias(service)) {
            service = this.getAlias(service);
        }
        return this.instances[service] || this.resolvedServices[service];
    };
    /**
     * Remove the alias from all services it is assigned to.
     *
     * @param alias
     */
    Container.prototype.removeAlias = function (alias) {
        var _this = this;
        if (this.aliases[alias] == null) {
            return;
        }
        Object.keys(this.serviceAliases)
            .forEach(function (service) {
            var aliases = _this.serviceAliases[service];
            var aliasIndex = aliases.indexOf(alias);
            if (aliasIndex > -1) {
                aliases.splice(aliasIndex, 1);
            }
        });
    };
    /**
     * Remove all resolved instances if this service is a singleton.
     *
     * @param service
     */
    Container.prototype.dropStaleInstances = function (service) {
        delete this.aliases[service];
        delete this.instances[service];
        return true;
    };
    /**
     * Bind a service that needs to be repeatedly resolved.
     *
     * @param service
     * @param dependencies
     * @param factory
     */
    Container.prototype.bind = function (service, dependencies, factory) {
        this.binder(service, dependencies, factory, false);
    };
    /**
     * {@inheritdoc}
     */
    Container.prototype.bindIf = function (service, dependencies, factory) {
        if (!this.bound(service)) {
            this.bind(service, dependencies, factory);
        }
    };
    /**
     * Bind a service that should be resolved once, the same value returned
     * from factory is repeatedly returned when the service is been resolved.
     *
     * @param service
     * @param dependencies
     * @param factory
     */
    Container.prototype.singleton = function (service, dependencies, factory) {
        this.binder(service, dependencies, factory);
    };
    /**
     * {@inheritdoc}
     */
    Container.prototype.singletonIf = function (service, dependencies, factory) {
        this.binder(service, dependencies, factory);
    };
    /**
     * The binds a service with a particular value, in which case
     * the value will always be returned the service is being
     * resolved from the container.
     *
     * @param service
     * @param value
     */
    Container.prototype.instance = function (abstract, value) {
        var service = this.getServiceId(abstract);
        this.removeAlias(service);
        delete this.aliases[service];
        var isBound = this.bound(service);
        this.instances[service] = value;
        this.bindServiceAsProps(service);
        if (isBound) {
            this.rebound(service);
        }
        return value;
    };
    /**
     * Adds a contextual binding to the container.
     *
     * @param concrete
     * @param service
     * @param factory
     */
    Container.prototype.addContextualBinding = function (concrete, service, factory) {
        var _a, _b;
        _a = [
            this.getServiceId(concrete), this.getServiceId(service)
        ], concrete = _a[0], service = _a[1];
        var contexts = this.contextuals[concrete] || {};
        this.contextuals[concrete] = __assign({}, contexts, (_b = {}, _b[this.getAlias(service)] = factory, _b));
    };
    /**
     * Define a contextual binding.
     *
     * @param service
     */
    Container.prototype.when = function (service) {
        return new ContextBuilder_1.default(this, this.getServiceId(service));
    };
    /**
     * "Extend" a service in the container.
     *
     * @param service
     * @param callback
     */
    Container.prototype.extend = function (service, callback) {
        service = this.getAlias(this.getServiceId(service));
        if (this.instances[service]) {
            this.instances[service] = callback(this.instances[service], this);
        }
        else {
            this.getExtenders(service).push(callback);
            if (this.resolved(service)) {
                this.rebound(service);
            }
        }
    };
    /**
     * Bind a new callback to an abstract's rebind event.
     *
     * @param service
     * @param callback
     */
    Container.prototype.rebinding = function (service, callback) {
        service = this.getAlias(this.getServiceId(service));
        this.getReboundCallbacks(service).push(callback);
        if (this.bound(service)) {
            return this.make(service);
        }
    };
    /**
     * Make given service from the container by injecting dependencies if any.
     *
     * @param service
     * @param parameters
     */
    Container.prototype.make = function (service, parameters) {
        if (parameters === void 0) { parameters = []; }
        return this.resolve(this.getServiceId(service), parameters);
    };
    /**
     * {@inheritdoc}
     */
    Container.prototype.get = function (id) {
        if (this.has(id)) {
            return this.resolve(id);
        }
        throw new Error(id + " not found in the container!");
    };
    /**
     * Returns all binded services in the container.
     */
    Container.prototype.getBindings = function () {
        return this.services;
    };
    /**
     * Clears the container.
     */
    Container.prototype.flush = function () {
        this.aliases = {};
        this.services = {};
        this.instances = {};
        this.resolvedServices = {};
    };
    /**
     * Clear all instances from the container.
     */
    Container.prototype.forgetInstances = function () {
        this.instances = {};
    };
    /**
     * Delete a resolved instance from the instance cache.
     */
    Container.prototype.forgetInstance = function (service) {
        service = this.getServiceId(service);
        delete this.instances[service];
    };
    /**
     * Remove all of extenders for a particular service.
     *
     * @param service
     */
    Container.prototype.forgetExtenders = function (service) {
        service = this.getServiceId(service);
        delete this.extenders[this.getAlias(service)];
    };
    /**
     * Add resolving callback to the container.
     *
     * @param service
     * @param callback
     */
    Container.prototype.resolving = function (service, callback) {
        if (typeof service === 'string') {
            service = this.getAlias(this.getServiceId(service));
        }
        if (!callback) {
            this.globalResolvingCallbacks.push(service);
        }
        else {
            if (!this.resolvingCallbacks[service]) {
                this.resolvingCallbacks[service] = [];
            }
            this.resolvingCallbacks[service].push(callback);
        }
    };
    /**
     * Add a callback to be called after a service has been resolved.
     *
     * @param service
     * @param callback
     */
    Container.prototype.afterResolving = function (service, callback) {
        if (typeof service == 'string') {
            service = this.getAlias(this.getServiceId(service));
        }
        if (!callback) {
            this.globalAfterResolvingCallbacks.push(service);
        }
        else {
            if (!this.afterResolvingCallbacks[service]) {
                this.afterResolvingCallbacks[service] = [];
            }
            this.afterResolvingCallbacks[service].push(callback);
        }
    };
    /**
     * Get the factory for a given service.
     *
     * @param service
     */
    Container.prototype.getConcrete = function (service) {
        var concrete = this.getContextualFactory(service);
        if (concrete) {
            return concrete;
        }
        if (this.services[service]) {
            return this.services[service].factory;
        }
        return service;
    };
    /**
     * Get the contextual concrete binding for the given service.
     *
     * @param service
     */
    Container.prototype.getContextualFactory = function (service) {
        var binding = this.findInContextualBinding(service);
        if (binding != null) {
            return binding;
        }
        if (utils_1.isEmpty(this.serviceAliases[service])) {
            return;
        }
        for (var _i = 0, _a = this.serviceAliases[service]; _i < _a.length; _i++) {
            var alias = _a[_i];
            binding = this.findInContextualBinding(alias);
            if (binding) {
                return binding;
            }
        }
    };
    /**
     * Checks if the service has a contextual binding
     * for the currently resolved service.
     *
     * @param service
     */
    Container.prototype.findInContextualBinding = function (service) {
        var lastInStack = this.serviceBuildStack[this.serviceBuildStack.length - 1];
        var abstract = this.contextuals[lastInStack];
        return abstract && abstract[service];
    };
    /**
     * Resolve the given service from the container.
     *
     * @param service
     * @param parameters
     */
    Container.prototype.resolve = function (service, parameters) {
        if (parameters === void 0) { parameters = []; }
        service = this.getAlias(service);
        var needsContextualBuild = !utils_1.isEmpty(parameters) || (this.getContextualFactory(service) != null);
        if (this.instances[service] && !needsContextualBuild) {
            return this.instances[service];
        }
        this.with.push(parameters);
        var concrete = this.getConcrete(service);
        var result = null;
        if (needsContextualBuild) {
            result = concrete(this);
        }
        else {
            result = this.build(service, concrete);
        }
        for (var _i = 0, _a = this.getExtenders(service); _i < _a.length; _i++) {
            var callback = _a[_i];
            result = callback(result, this);
        }
        if (this.isShared(service) && !needsContextualBuild) {
            this.instances[service] = result;
        }
        this.fireResolvingCallbacks(service, result);
        this.resolvedServices[service] = true;
        this.with.pop();
        return result;
    };
    /**
     * Build a service by injecting the dependecies to the factory.
     *
     * @param factory
     */
    Container.prototype.build = function (service, concrete) {
        var binding = this.services[service];
        if (!binding) {
            throw new Error("Service [" + service + "] not found in the container!");
        }
        var dependencies = binding.dependencies;
        this.serviceBuildStack.push(service);
        var deps = this.resolveDependencies(dependencies);
        this.serviceBuildStack.pop();
        return concrete.apply(void 0, deps);
    };
    /**
     * Resolve the given dependencies from the container.
     *
     * @param dependencies
     */
    Container.prototype.resolveDependencies = function (dependencies) {
        var results = [];
        for (var _i = 0, dependencies_1 = dependencies; _i < dependencies_1.length; _i++) {
            var dependency = dependencies_1[_i];
            results.push(this.resolve(dependency));
        }
        return results;
    };
    /**
     * Fire resolving callbacks.
     *
     * @param service
     * @param result
     */
    Container.prototype.fireResolvingCallbacks = function (service, result) {
        this.fireCallbackArray(result, this.globalResolvingCallbacks);
        this.fireCallbackArray(result, this.getCallbacksForService(service, this.resolvingCallbacks));
        this.fireAfterResolvingCallbacks(service, result);
    };
    /**
     * Fire all after resolving callbacks.
     *
     * @param service
     * @param result
     */
    Container.prototype.fireAfterResolvingCallbacks = function (service, result) {
        this.fireCallbackArray(result, this.globalAfterResolvingCallbacks);
        this.fireCallbackArray(result, this.getCallbacksForService(service, this.afterResolvingCallbacks));
    };
    /**
     * Returns the callbacks for the given service.
     *
     * @param service
     * @param callbacksForService
     */
    Container.prototype.getCallbacksForService = function (service, callbacksForService) {
        var _this = this;
        var callbacks = [];
        Object.keys(callbacksForService)
            .forEach(function (k) {
            if (_this.getAlias(k) == service || service == k) {
                callbacks.push.apply(callbacks, callbacksForService[k]);
            }
        });
        return callbacks;
    };
    /**
     * Call the callbacks in the given array passing the given result.
     *
     * @param result
     * @param callbacks
     */
    Container.prototype.fireCallbackArray = function (result, callbacks) {
        for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
            var callback = callbacks_1[_i];
            callback(result, this);
        }
    };
    /**
     * Get all extenders for a given service.
     *
     * @param service
     */
    Container.prototype.getExtenders = function (service) {
        return this.extenders[service] || (this.extenders[service] = []);
    };
    /**
     * Calls all rebound callbacks attached to the service.
     *
     * @param service
     */
    Container.prototype.rebound = function (service) {
        var newValue = this.make(service);
        for (var _i = 0, _a = this.getReboundCallbacks(service); _i < _a.length; _i++) {
            var callback = _a[_i];
            callback(this, newValue);
        }
    };
    /**
     *
     * @param service
     * @param dependencies
     * @param factory
     * @param shared
     */
    Container.prototype.binder = function (service, dependencies, factory, shared) {
        var _this = this;
        if (factory === void 0) { factory = utils_1.noop; }
        if (shared === void 0) { shared = true; }
        var abstract = this.getServiceId(service);
        this.dropStaleInstances(abstract);
        if (!Array.isArray(dependencies)) {
            factory = dependencies;
            dependencies = [];
        }
        this.services[abstract] = {
            shared: shared,
            factory: factory,
            dependencies: dependencies.map(function (v) { return _this.getServiceId(v); })
        };
        this.bindServiceAsProps(abstract);
        if (this.resolved(abstract)) {
            this.rebound(abstract);
        }
    };
    /**
     * Get the auto-generated id if the parameter
     * is a function/factory
     *
     * @param id
     */
    Container.prototype.getServiceId = function (id) {
        var abstract = utils_1.isFunction(id)
            ? utils_1.attachKey(id) : id;
        return String(abstract);
    };
    /**
     * Attach the service name as property so that it can be resolved
     * accessing it as a property on the container, e.g. container[service].
     *
     * @param service
     */
    Container.prototype.bindServiceAsProps = function (service) {
        var _this = this;
        Object.defineProperty(this, service, {
            configurable: true,
            get: function () { return _this.make(service); }
        });
    };
    /**
     * Return callbacks.
     *
     * @param service
     */
    Container.prototype.getReboundCallbacks = function (service) {
        var callbacks = this.reboundCallbacks[service];
        return Array.isArray(callbacks)
            ? callbacks : (this.reboundCallbacks[service] = []);
    };
    return Container;
}());
exports.Container = Container;
exports.default = Container;
