---
title: 'Introduction'
sidebar: 'auto'
prev: '/'
editLink: true
---

# Introduction

A powerful and lightweight inversion of control container for JavaScript, Electron.js & Node.js apps powered by TypeScript.

## Introduction To Newcomers

**DIC-JS** is a lightweight inversion of control (IoC) container for TypeScript and JavaScript apps. **DIC-JS** has a friendly API and encourages the usage of the best OOP and IoC practices.

**Dic-JS** is a powerful tool for managing service dependencies and performing dependency injection. Dependency injection is a fancy phrase that essentially means this: service dependencies are "injected" into the factory as arguments/parameters.

Let's look at a simple example:

```ts
const {bind, make} = require('dic-js')
// using the comment style for this style should be used
// with helper `wrap` or binded directly into the
// container without specifying dependencies
const print = screen => {
  /*@container(screen)*/
  return msg => screen.log(msg)
}

// the next line is only possible in <v0.8
bind('phone', ['screen'], print)

bind('phone').deps(['screen']).factory(print)
bind('phone').dependsOn(['screen']).factory(print)

const call = make('phone')
call('lover') // => 'lover'

// if using typescript with 'experimentalDecorators' option enabled.
import { Singleton, Make, Bind } from 'dic-js/out/decorators'

@Singleton
export class Board {}

@Singleton
export class App {
  constructor(@Make(Board) protected board: Board) {}
}

// you can resolve as usual
const app: App = make(App)
```

## Binding

Almost all of your service container bindings will be registered before use in the application, i.e. service registration before main application code

:::tip
There is no need to bind services into the container if they do not depend on any other services.
:::

We can register a binding using the `bind` method, passing the service name that we wish to register along with a Closure that returns a value to be consumed by other services/application:

```js
bind('phone', container => new Phone(container.make('screen'))) // <v0.8

bind('phone').factory(...)
// passing a container instance to bind to instead of the global instance
bind('phone', containerInstance).factory(...)

// using typescript

@Bind
@Bind('app') // if you want to bind to a different context.
class Phone {}
```

Note that we receive the container itself as an argument to the resolver only if no dependency is declared. We can then use the container to resolve sub-dependencies of the object/service we are building.

### Binding A Singleton

The `singleton` method binds a service into the container that should only be resolved one time. Once a singleton binding is resolved, the same value/object instance will be returned on subsequent calls into the container:

```js
const {make, singleton} = require('dic-js')
// its shares same api as the bind method
singleton('screen', () => new Screen(...)) // <v0.8

singleton('screen').factory(...)
singleton('screen', containerInstance).factory(...)

make('screen') === make('screen') // => true


// using typescript

@Singleton
@Singleton('app') // if you want to bind to a different context.
class Screen {}
```

### Binding Instances

You may also bind an existing value/object instance into the container using the instance method. The given instance will always be returned on subsequent calls into the container:

```js
const button = new BackButton()
const {instance} = require('dic-js')
instance('back-btn', button) // <v0.8

const {getContext} = require('dic-js')

// call to getContext without parameter returns the
// global container instance.
getContext().instance('back-btn', button)
// getContext returns a container tagged with the id
getContext('id').instance('back-btn', button)
```

### Binding Primitives

Sometimes you may have a service that receives some injected services, but also needs an injected primitive value such as an integer. You may easily use contextual binding to inject any value your class may need:

```js
const {when} = require('dic-js')

if (application in development) {
  when('phone').needs('number').give('123456789') // <v0.8

  // returns the global container
  getContext().when('phone')
    .needs('number')
    .give('123456789')

  // get a tagged container instance
  getContext('app').when('phone')
    .needs('number')
    .give('123456789')
}
```

### Contextual Binding

Sometimes you may have two services that depends on the same service, but you wish to inject different implementations into each services. For example, two services may depend on different implementations of the __filesystem__ service, where one needs access to phone or cloud storage. ContainerJS provides a simple, fluent interface for defining this behavior:

```js
// the next contextual binding is only possible in <v0.8
when('filemanager.sdcard')
  .needs('filereader')
  .give(() => new SdCardReader())

if (application in development) {
  when('phone').needs('screen')
    .give(() => new ConsoleScreen())
}

// the next bindings is >=0.8
const container = getContext()
container.when('filemanager.sdcard')
  .needs('filereader')
  .give(() => new SdCardReader())

container.when('filemanager.clouds')
  .needs('filereader')
  .give(() => new CloudReader(...))
```

### Extending Service

The `extend` method allows the modification of resolved services. For example, when a service is resolved, you may run additional code to decorate or configure the service. The `extend` method accepts a Closure, which should return the modified service, as its only argument:

```js
const {extend} = require('dic-js')
extend('screen', s => s.setSize(...) && s) // <v0.8

// using the global container
getContext().extend('screen', s => s.setSize(...) && s)
// tagged container instance
getContext('a').extend('screen', s => s.setSize(...) && s)
```

### Anonymous Service Binding

Instead of hard-coding the services id or name you can let the library do that for you
by binding a factory only, example;

```js
const factory = () => ({...})

bind(factory)
singleton(factory)
instance(factory, ({...})) // <v0.8

const callMe = () => ...

// The service depends on an anonymous service.
bind([factory, 'screen'], callMe) // <v0.8

bind(callMe)
  .dependsOn([factory, 'screen'])
  .factory(callMe)
```

To resolve or make an anonymous service, you pass the factory itself:

```js
// the following dependencies are being resolved
// from the global container.
const obj = make(factory)
const obj1 = make(callMe)

// dependencies are being resolved from the given container
const obj = make(factory, container)
const obj1 = make(callMe, container)
// or on the container instance itself
container.make(factory)
container.make(callMe)
```

:::warning Version &lt;v0.8
Typehints found on factories will always come before the defined dependencies
in the array as arguments to the factory.
:::
:::warning Version >= v0.8
Typehints on factories won't be resolved anymore.
:::

## Resolving

The `make` method.

You may use the `make` method to resolve a service instance out of the container. The make method accepts the name of the service you wish to resolve:

```js
const {make, getContext} = require('dic-js')
phone = make('phone') // dependency resolved from the global container
// dependency resolved from the given container
phone = make('phone', getContext('aa'))

phone = getContext('aa').make('phone')

// The make method also accepts an anonymous dependency
phone = make(factory)
phone.call()
```

### Automatic Injection

Alternatively, and importantly, you may "type-hint" the dependency in the body of the resolver of the service using `/*@container(...dependencies)*/`.
<!-- In practice, this is how most of your objects should be resolved by the container. -->

For example, you may type-hint a service defined by your application in another service resolver or any function. The dependencies will automatically be resolved and injected into the service/callback:

```js
const {wrap} = require('dic-js')
const messenger = wrap(['phone'], (p, msg) => p.message(msg))

messenger('hello world') // => hello world
// or
const messenger = wrap((p, msg) => {
  /*@container(phone)*/
  return p.message(msg)
})
// or
singleton('database', (config) => {
  /*@container(config)*/
  return new Connector(config.get('database.*'))
})
```

:::warning
Auto-Injection is only possible with named abstract/service, not anonymous service.
And it's only available in versions before 0.8.
:::

## >= v0.8

The library was rewritten in typescript. The biggest difference with <v0.8;

1. The container instance is not global anymore, though there is a global instance which is accessible through `getContext`.
2. Exported methods wrap, extend, e.t.c has been removed, leaving `getContext`, `bind`, `singleton` and `make`

### Container Context

You can have a separate container context for your library use so as to avoid global conflict with other libraries that may be making use of this library. The only difference is that state isn't shared among container contexts in the application i.e a binding in a container can't resolved in another container instance.

```js
const {getContext} = require('dic-js)
const container = getContext('lib:app')

getContext() // returns the global container instance.

getContext() !== getContext('lib:app') // true
```

:::tip
You're advised to use a unique id for each created context so as not to lead to a conflict. If used in a library, the id is most preferable, the library name and any other prefix. e.g `dicJS.getContext('library-name:prefix')`.
:::

### Tagging

Occasionally, you may need to resolve all of a certain "category" of binding. For example, perhaps you are building a report aggregator that receives an array of many different Report implementations. After registering the Report implementations, you can assign them a tag using the tag method:

```js
container.bind('SpeedReport', function () {
    //
})

container.bind('MemoryReport', function () {
    //
})

container.tag(['SpeedReport', 'MemoryReport'], 'reports')

// resolve tagged dependencies
container.tagged('reports') // [...dependencies]
```
:::tip
Tagging replaces `resolve` method in <v0.8.
:::

## Decorators

You can now make use of decorators to define services and they can all be resolved using the
`const {make} = require('dic-js')` function.

### @Bind(contexts?: `string|string[]`)

- **Usage:**

  ``` js
  @Bind
  class App {}

  @Bind('app')
  class Apps {}
  ```
  Binds the class to the default container or the given context|s. You can also provide
  a context if you don't want to bind to the default container.


### @Singleton(contexts?: `string|string[]`)

- **Usage:**

  ``` js
  @Singleton
  class App {}
  ```
  Binds the class as a singleton to the default container or the given context|s. You can also provide
  a context if you don't want to bind to the default container


### @Make(`service: factory|class, contexts?: string|string[]`)

- **Usage:**

  ``` js
  @Singleton
  class Config {}

  @Bind
  class App {
    constructor(@Make(Config) private config: Config) {}
  }
  ```
  This helps define the constructor parameter type.

:::tip
Guess what :wink:, you can resolve the classes/services using the same old method `const app = make(App)`.
:::

:::warning
If a context is provided then the service can only be reolved from the given|contexts,
so you might need to specify which context to resolve the service from.

```js
@Bind('app')
class App {}

@Singleton
class Logger {
  constructor(@Make(App, 'app') private app: App) {}
}
```
:::

## Api Documentation

The api for the library can be found in the declaration files(*.d.ts) in the source of the library.
