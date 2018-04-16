{ResolveError, NotFoundError} = require './errors'
{is_nil, is_object, is_function, noop, array_wrap, wrap_func} = require './utils'

buildStack = []

class Container
    #
    _contextual: {}
    #
    _aliases: {}
    #
    _abstractAliases: {}
    #
    _bindings: {}
    #
    _resolved: {}
    #
    _instances: {}
    #
    _extenders: {}
    #
    _reboundCallbacks: {}

    ###
    # sets a global instance, if not exists create it, and return
    #
    # @return {Container}
    ###
    @getInstance: ->
        @instance = new Container if is_nil @instance
        @instance

    ###
    # replaces the global instance with the passed instance
    #
    # @param  {Container} instance
    # @return {Container}
    ###
    @setInstance: (@instance) -> @instance

    ###
    # aliases an abstract defined in the container to allow
    # resolving the abstract using the alias name
    #
    # @param  {string}  abstract
    # @param  {string}  alias
    ###
    alias: (abstract, alias) ->
        @_aliases[alias] = abstract
        aliases = @_abstractAliases[abstract] = array_wrap @_abstractAliases[abstract]
        aliases.push alias

    ###
    # get the concrete the param is assigned to in case its an
    # alias to abstract in the container
    #
    # @param  {string} abstract
    # @return {string}
    # @throws {Error}
    ###
    getAlias: (abstract) ->
        return abstract if not @_aliases[abstract]
        throw new Error "[#{abstract}] is aliased to itself!" if abstract is @_aliases[abstract]
        @getAlias @_aliases[abstract]

    ###
    # checks if the given value is an alias to another abstract
    #
    # @param  {string}  abstract
    # @return {boolean}
    ###
    isAlias: (abstract) -> not is_nil @_aliases[abstract]

    ###
    # checks if the abstract is a singleton or to be
    # resolved once from the container
    #
    # @param  {string}  abstract
    # @return {boolean}
    ###
    isShared: (abstract) ->
        on if @_instances[abstract] || (
            @_bindings[abstract] && @_bindings[abstract].shared
        )

    ###
    # checks if the given abstract has been bound
    #
    # @param  {string}  abstract
    # @return {boolean}
    ###
    bound: (abstract) ->
        on if @_bindings[abstract] || @_instances[abstract] || @isAlias abstract

    ###
    # determines if the given abstract has been resolved
    # from the container
    #
    # @param  {string}  abstract
    # @return {boolean}
    ###
    resolved: (abstract) ->
        abstract = @getAlias abstract if @isAlias abstract
        @_resolved[abstract] || @_instances[abstract]

    ###
    # removes the abstract from the container
    #
    # @param  {string}  abstract
    ###
    dropStaleInstances: (abstract) ->
        delete @_instances[abstract]
        delete @_aliases[abstract]

    ###
    # makes the abstract accessible like its a prop
    # on the container itself
    #
    # @param  {string}  abstract
    ###
    bindToContainerProps: (abstract) ->
        return if not is_nil @[abstract]
        Object.defineProperty @, abstract,
            configurable: true,
            get: () -> @make abstract

    ###
    # this is the base method which is used all other methods
    # in binding an abstract into the container
    #
    # @param  {string}    abstract
    # @param  {array}     deps
    # @param  {function}  factory
    # @param  {boolean}   shared
    ###
    binder: (abstract, deps = [], factory = noop, shared = true) ->
        @dropStaleInstances abstract
        @_bindings[abstract] = {
            deps
            shared
            factory: wrap_func(factory)
        }
        @bindToContainerProps abstract
        @rebound abstract if @resolved abstract

    ###
    # this binds an abstract that should be resolved once
    #
    # @param  {string}    abstract
    # @param  {array}     deps
    # @param  {function}  factory
    ###
    singleton: (abstract, deps = [], factory = noop) ->
        @binder abstract, deps, factory

    ###
    # {@inherit}
    ###
    bind: (abstract, deps = [], factory = noop) ->
        @binder abstract, deps, factory, false

    ###
    # removes the abstract if its alias to another abstract type
    #
    # @param  {string}  search
    ###
    removeAbstractAlias: (search) ->
        return if is_nil @_aliases[search]
        for abstract, aliases of @_abstractAliases
            aliases.splice index, 1 for alias, index in aliases when alias is search
        null

    ###
    #
    ###
    instance: (abstract, instance) ->
        @removeAbstractAlias abstract
        delete @_aliases[abstract]
        @_instances[abstract] = instance
        @bindToContainerProps abstract
        @rebound abstract if @bound abstract
        instance

    #
    getConcrete: (abstract) ->
        binding = @getContextualFactory abstract
        return binding if not is_nil binding
        @_bindings[abstract] if @_bindings[abstract]

    #
    getContextualFactory: (abstract) ->
        bindings = @findInContextualBindings abstract
        return bindings if not is_nil bindings
        return if is_nil @_abstractAliases[abstract]
        for alias in @_abstractAliases[abstract]
            return binding if binding = @findInContextualBindings alias

    #
    findInContextualBindings: (abstract) ->
        last = buildStack[buildStack.length - 1]
        context = @_contextual[last]
        context[abstract] if context && context[abstract]

    #
    make: (abstract) -> @resolve abstract

    #
    resolve: (abstract) ->
        context = @getContextualFactory abstract = @getAlias abstract
        return @_instances[abstract] if @_instances[abstract] and not context
        concrete = @getConcrete abstract
        val = @build abstract, concrete
        val = callback val, @ for callback in @getExtenders abstract
        @_instances[abstract] = val if @isShared abstract
        @_resolved[abstract] = on
        val

    #
    addContextualBinding: (concrete, abstract, giver = noop) ->
        @_contextual[concrete] = @_contextual[concrete] || {}
        @_contextual[concrete][@getAlias abstract] = wrap_func giver

    #
    build: (abstract, concrete) ->
        if is_object concrete then {deps, factory} = concrete else factory = concrete
        deps = array_wrap deps
        if not is_function factory
            throw new NotFoundError "service '#{abstract}' not found in the container!"
        try
            return factory @ if deps and deps.length < 1
            buildStack.push abstract
            args = @resolveDeps deps
            buildStack.pop()
            factory args...
        catch error
            err = new ResolveError "unable to build service '#{abstract}'", deps
            err.setBaseError error
            throw err

    #
    resolveDeps: (deps = []) -> @make dep for dep in array_wrap deps

    #
    rebound: (abstract) ->
        instance = @make abstract
        callback @, instance for callback in @getReboundCallbacks abstract

    #
    getReboundCallbacks: (abstract) ->
        return @_reboundCallbacks[abstract] if Array.isArray @_reboundCallbacks[abstract]
        []

    #
    rebinding: (abstract, callback = noop) ->
        abstract = @getAlias abstract
        callbacks = @_reboundCallbacks[abstract] = array_wrap @_reboundCallbacks[abstract]
        callbacks.push callback
        @make abstract if @bound abstract

    #
    extend: (abstract, callback = noop) ->
        abstract = @getAlias abstract
        if @_instances[abstract]
            @_instances[abstract] = callback @_instances[abstract], @
            @rebound abstract
        else
            callbacks = @_extenders[abstract] = array_wrap @_extenders[abstract]
            callbacks.push callback
            @rebound abstract if @resolved abstract

    #
    getExtenders: (abstract) ->
        abstract = @getAlias abstract
        return @_extenders[abstract] if not is_nil @_extenders[abstract]
        []

    #
    forgetExtenders: (abstract) -> delete @_extenders[@getAlias abstract]

    #
    forgetInstance: (abstract) -> delete @_instances[abstract]

    #
    forgetInstances: -> @_instances = {}

    #
    flush: ->
        @_aliases = {}
        @_bindings = {}
        @_resolved = {}
        @_instances = {}
        @_abstractAliases = {}
        null

exports.Container = Container
