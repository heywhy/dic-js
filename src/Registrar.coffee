{noop, array_wrap} = require './utils'

class Registrar
    #
    _deps: null
    #
    constructor: (@container, @abstract, @singleton = false) ->
    #
    deps: (@_deps = []) -> @
    #
    factory: (factory = noop) ->
        deps = array_wrap @_deps
        if @singleton then @container.singleton @abstract, deps, factory
        else @container.bind @abstract, deps, factory

exports.Registrar = Registrar
