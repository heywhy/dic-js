---
title: 'Introduction'
sidebar: 'auto'
prev: '/'
editLink: true
---

# Introduction

Have you ever thought of how beautiful **Laravel** container is. Here is an implementation in *javascript*. :grinning:

## Introduction To Newcomers

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

## Binding

Almost all of your service container bindings will be registered before use in the application, i.e. service registration before main application code

:::tip
There is no need to bind services into the container if they do not depend on any other services.
:::

We can register a binding using the `bind` method, passing the service name that we wish to register along with a Closure that returns a value to be consumed by other services/application:

```js
bind('phone', container => new Phone(container.make('screen')))
```

Note that we receive the container itself as an argument to the resolver only if no dependency is declared. We can then use the container to resolve sub-dependencies of the object/service we are building.

### Binding A Singleton

The `singleton` method binds a service into the container that should only be resolved one time. Once a singleton binding is resolved, the same value/object instance will be returned on subsequent calls into the container:

```js
const {make, singleton} = require('dic-js')
// its shares same api as the bind method
singleton('screen', () => new Screen(...))
make('screen') === make('screen') // => true
```

### Binding Instances

You may also bind an existing value/object instance into the container using the instance method. The given instance will always be returned on subsequent calls into the container:

```js
const button = new BackButton()
const {instance} = require('dic-js')
instance('back-btn', button)
```

### Binding Primitives

Sometimes you may have a service that receives some injected services, but also needs an injected primitive value such as an integer. You may easily use contextual binding to inject any value your class may need:

```js
const {when} = require('dic-js')

if (application in development) {
  when('phone').needs('number').give('123456789')
}
```

### Contextual Binding

Sometimes you may have two services that depends on the same service, but you wish to inject different implementations into each services. For example, two services may depend on different implementations of the __filesystem__ service, where one needs access to phone or cloud storage. ContainerJS provides a simple, fluent interface for defining this behavior:

```js
when('filemanager.sdcard')
  .needs('filereader')
  .give(() => new SdCardReader())

when('filemanager.clouds')
  .needs('filereader')
  .give(() => new CloudReader(...))

if (application in development) {
  when('phone').needs('screen')
    .give(() => new ConsoleScreen())
}
```

### Extending Service

The `extend` method allows the modification of resolved services. For example, when a service is resolved, you may run additional code to decorate or configure the service. The `extend` method accepts a Closure, which should return the modified service, as its only argument:

```js
const {extend} = require('dic-js')
extend('screen', s => s.setSize(...) && s)
```

### Anonymous Service Binding

Instead of hard-coding the services id or name you can let the library do that for you
by binding a factory only, example;

```js
const factory = () => ({...})

bind(factory)
singleton(factory)
instance(factory, ({...}))

const callMe = () => ...

// The service depends on an anonymous service.
bind([factory, 'screen'], callMe)
```

To resolve or make an anonymous service, you pass the factory itself:

```js
const obj = make(factory)
const obj1 = make(callMe)
```

:::warning
Typehints found on factories will always come before the defined dependencies
in the array as arguments to the factory.
:::

## Resolving

The `make` method.

You may use the `make` method to resolve a service instance out of the container. The make method accepts the name of the service you wish to resolve:

```js
const {make} = require('dic-js')
const phone = make('phone')
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
