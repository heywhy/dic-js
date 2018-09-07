{noop, getDICKey} = require './utils'

class ContextBuilder
  #
  _needs: null

  ###*
  #
  ###
  # coffeelint: disable=no_empty_functions
  constructor: (@container, concrete) ->
    @concrete = getDICKey(concrete) or concrete

  ###*
  #
  ###
  needs: (tag) ->
    @_needs = getDICKey(tag) or tag
    # coffeelint: disable=no_stand_alone_at
    @

  ###*
  #
  ###
  give: (factory = noop) ->
    @container.addContextualBinding @concrete, @_needs, factory


exports.ContextBuilder = ContextBuilder
