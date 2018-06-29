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
const { bind, make, wrap, extend, singleton } = require('./lib/index')
bind('phone', () => ({ no: 080 }))

singleton('screen', () => ({
  print: msg => console.log(msg)
}))

const callback = wrap((phone, screen, a) => {
  /*@container(phone, screen)*/
  return [phone, screen, a]
})

console.log(callback('hello'))

singleton('caller', phone => {
  /*@container(phone)*/
  phone.call = () => 'hello world'
  return phone
})

console.log(make('caller').call())

console.log(extend)
