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
const { getContext } = require('./out/index')
const context = getContext()

context.bind('phone', () => ({ no: 080 }))

// singleton('screen', () => ({
//   print: msg => console.log(msg)
// }))

// const callback = wrap((phone, screen, a) => {
//   /*@container(phone, screen)*/
//   return [phone, screen, a]
// })

// console.log(callback('hello'))

context.singleton('caller', (phone) => {
  /*@container(phone)*/
  phone.call = () => 'hello world'
  return phone
})

// console.log(make('caller').call())

// console.log(extend)

const jik = (c) => {
  /*@container(caller)*/
  return {c, name: 'killer'}
}
const c = () => 'hello'
context.bind(c)

context.bind([c], jik)
// instance(jik, "Helli")

// when(jik).needs(c)
//   .give(() => 'love')
context.extend(jik, a => ({...a, lop: "lop"}))
// bind(['caller'], jik)

try {
  console.log(make(jik))
  console.log(wrap([c, 'caller'], (...a) => a)())
} catch (e) {
  console.error(e.baseError)
}

context.bind('a', 'as')
context.bind('as', 'as')

console.log(context.resolve(['a', 'as']))
