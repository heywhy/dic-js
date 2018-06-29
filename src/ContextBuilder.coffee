{noop} = require './utils'

class ContextBuilder
  #
  _needs: null

  ###*
  #
  ###
  # coffeelint: disable=no_empty_functions
  constructor: (@container, @concrete) ->

  ###*
  #
  ###
  needs: (tag) ->
    @_needs = tag
    # coffeelint: disable=no_stand_alone_at
    @

  ###*
  #
  ###
  give: (factory = noop) ->
    @container.addContextualBinding @concrete, @_needs, factory


exports.ContextBuilder = ContextBuilder
