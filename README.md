# Dic Js

A powerful and lightweight inversion of control container for JavaScript, Electron.js & Node.js apps powered by TypeScript.

## Introduction To Newcomers

DIC-JS is a lightweight inversion of control (IoC) container for TypeScript and JavaScript apps. DIC-JS has a friendly API and encourages the usage of the best OOP and IoC practices.

Dic-JS is a powerful tool for managing service dependencies and performing dependency injection. Dependency injection is a fancy phrase that essentially means this: service dependencies are "injected" into the factory as arguments/parameters.

Let's look at a simple example:

```js
const {bind} = require('dic-js')
// using the comment style for this style should be used
// with helper `wrap` or binded directly into the
// container without specifying dependencies
const print = screen => {
  /*@container(screen)*/
  return msg => screen.log(msg)
}

// or
bind('phone', ['screen'], print)
bind('phone').deps(screen).factory(print)
```

Read the [docs](https://heywhy.github.io/dic-js/)
