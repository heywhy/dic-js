// const {
//   bind, make, when, wrap, singleton
// } = require('./')

// bind('greeter')
//   .factory(() => {
//     return new class Greeter {
//       greet() {
//         return 'Hello from container-js'
//       }
//     }
//   })

// bind('phone')
//   .deps(['screen', 'greeter'])
//   .factory((screen, greeter) => {
//     return new class Phone {
//       call() {
//         screen.print(greeter.greet())
//       }
//     }
//   })

// singleton('screen', () => ({
//   print: msg => console.log(msg)
// }))

// const phone = make('phone')
// phone.call()

// when('phone').needs('screen')
//   .give(() => ({
//     print: msg => console.log(msg)
//   }))

// const tear = when('phone').needs('greeter')
//   .give(() => {
//     return new class ErrorGreeter {
//       greet() {
//         return 'An error occured while sending greetings from container-js'
//       }
//     }
//   })

// const error = make('phone')
// error.call()

// tear()
// const call = wrap(['phone'], p => p.call())
// call()
const { getContext, make } = require('./out/index')
const context = getContext()

const {App, Board} = require('./out/test')

// getContext('app1').singletonIf(Board, [], () => {
//   const b = new Board()
//   b.as = 'asd'
//   return b
// })

console.log(make(App).board)
console.log(make(Board, getContext('app1')))
