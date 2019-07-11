const {getContext} = require('./out')
const container = getContext('aa')
const {bind, singleton} = require('./out')

// import {bind, singleton, getContext} from 'dic-js'

// const container = getContext()

const factory = (a,b) => ({a, b, kill: 'home'})

const alphas = () => 'ayo'

singleton(alphas, container).factory(alphas)
bind('hello:app',container).factory(() => ({name: 'ay'}))

singleton(factory, container)
  .dependsOn(['hello:app', alphas])
  .factory(factory)

getContext('aa').when(factory)
  .needs('hello:app').give(123)

container.when(factory)
  .needs('alphas').give(23)

container.when(factory)
  .needs('hello').give(2390)

container.alias(factory, 'a')

container.bind('killer', a => a)
// d
const v = container.make('a')

container.tag([factory], 'lives')

console.log(container.tagged('lives'))
