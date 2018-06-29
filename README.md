# Container Js

Have you ever thought of how beautiful **Laravel** container is. Here is an implementation in *javascript*. :grinning:

## Introduction To Newcomers

Container-js is a powerful tool for managing service dependencies and performing dependency injection. Dependency injection is a fancy phrase that essentially means this: service dependencies are "injected" into the factory as arguments/parameters.

Let's look at a simple example:

```js
const {bind} = require('container-js')
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

Read the [docs](https://heywhy.github.io/container-js/)
