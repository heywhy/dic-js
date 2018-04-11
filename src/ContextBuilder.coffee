{noop} = require './utils'

class ContextBuilder
    #
    _needs: null
    #
    constructor: (@container, @concrete) ->
    #
    needs: (tag) ->
        @_needs = tag
        @
    #
    give: (factory = noop) ->
        @container.addContextualBinding @concrete, @_needs, factory

exports.ContextBuilder = ContextBuilder
