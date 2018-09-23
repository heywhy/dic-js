{Context} = require './Context'
{Container} = require './Container'

defaultContext = new Context Container.getInstance()

contexts = {}

exports.getContext = (id) ->
  return contexts[id] if contexts[id]
  contexts[id] = new Context new Container


exports.bind = (args...) -> defaultContext.bind args...

exports.singleton = (args...) -> defaultContext.singleton args...

exports.instance = (args...) -> defaultContext.instance args...

exports.extend = (args...) -> defaultContext.extend args...

exports.wrap = (args...) -> defaultContext.wrap args...

exports.resolve = (args...) -> defaultContext.resolve args...

exports.make = (args...) -> defaultContext.make args...

exports.when = (abstract) -> defaultContext.make abstract
