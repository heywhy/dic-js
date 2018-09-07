(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{165:function(s,t,n){"use strict";n.r(t);var a=n(0),e=Object(a.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("div",{staticClass:"content"},[n("h1",{attrs:{id:"introduction"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#introduction","aria-hidden":"true"}},[s._v("#")]),s._v(" Introduction")]),s._v(" "),n("p",[s._v("Have you ever thought of how beautiful "),n("strong",[s._v("Laravel")]),s._v(" container is. Here is an implementation in "),n("em",[s._v("javascript")]),s._v(". 😀")]),s._v(" "),n("h2",{attrs:{id:"introduction-to-newcomers"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#introduction-to-newcomers","aria-hidden":"true"}},[s._v("#")]),s._v(" Introduction To Newcomers")]),s._v(" "),n("p",[s._v('Dic-JS is a powerful tool for managing service dependencies and performing dependency injection. Dependency injection is a fancy phrase that essentially means this: service dependencies are "injected" into the factory as arguments/parameters.')]),s._v(" "),n("p",[s._v("Let's look at a simple example:")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[s._v("const")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("bind"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token function"}},[s._v("require")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'dic-js'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{attrs:{class:"token comment"}},[s._v("// using the comment style for this style should be used")]),s._v("\n"),n("span",{attrs:{class:"token comment"}},[s._v("// with helper `wrap` or binded directly into the")]),s._v("\n"),n("span",{attrs:{class:"token comment"}},[s._v("// container without specifying dependencies")]),s._v("\n"),n("span",{attrs:{class:"token keyword"}},[s._v("const")]),s._v(" "),n("span",{attrs:{class:"token function-variable function"}},[s._v("print")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" screen "),n("span",{attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{attrs:{class:"token comment"}},[s._v("/*@container(screen)*/")]),s._v("\n  "),n("span",{attrs:{class:"token keyword"}},[s._v("return")]),s._v(" msg "),n("span",{attrs:{class:"token operator"}},[s._v("=>")]),s._v(" screen"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("log")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("msg"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),n("span",{attrs:{class:"token comment"}},[s._v("// or")]),s._v("\n"),n("span",{attrs:{class:"token function"}},[s._v("bind")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'phone'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("[")]),n("span",{attrs:{class:"token string"}},[s._v("'screen'")]),n("span",{attrs:{class:"token punctuation"}},[s._v("]")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" print"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{attrs:{class:"token function"}},[s._v("bind")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'phone'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("deps")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("screen"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("factory")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("print"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br")])]),n("h2",{attrs:{id:"binding"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#binding","aria-hidden":"true"}},[s._v("#")]),s._v(" Binding")]),s._v(" "),n("p",[s._v("Almost all of your service container bindings will be registered before use in the application, i.e. service registration before main application code")]),s._v(" "),n("div",{staticClass:"tip custom-block"},[n("p",{staticClass:"custom-block-title"},[s._v("TIP")]),s._v(" "),n("p",[s._v("There is no need to bind services into the container if they do not depend on any other services.")])]),s._v(" "),n("p",[s._v("We can register a binding using the "),n("code",[s._v("bind")]),s._v(" method, passing the service name that we wish to register along with a Closure that returns a value to be consumed by other services/application:")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token function"}},[s._v("bind")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'phone'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" container "),n("span",{attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),n("span",{attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{attrs:{class:"token class-name"}},[s._v("Phone")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("container"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("make")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'screen'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("Note that we receive the container itself as an argument to the resolver only if no dependency is declared. We can then use the container to resolve sub-dependencies of the object/service we are building.")]),s._v(" "),n("h3",{attrs:{id:"binding-a-singleton"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#binding-a-singleton","aria-hidden":"true"}},[s._v("#")]),s._v(" Binding A Singleton")]),s._v(" "),n("p",[s._v("The "),n("code",[s._v("singleton")]),s._v(" method binds a service into the container that should only be resolved one time. Once a singleton binding is resolved, the same value/object instance will be returned on subsequent calls into the container:")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[s._v("const")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("make"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" singleton"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token function"}},[s._v("require")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'dic-js'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{attrs:{class:"token comment"}},[s._v("// its shares same api as the bind method")]),s._v("\n"),n("span",{attrs:{class:"token function"}},[s._v("singleton")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'screen'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),n("span",{attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{attrs:{class:"token class-name"}},[s._v("Screen")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token operator"}},[s._v("...")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{attrs:{class:"token function"}},[s._v("make")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'screen'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("===")]),s._v(" "),n("span",{attrs:{class:"token function"}},[s._v("make")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'screen'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("// => true")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br")])]),n("h3",{attrs:{id:"binding-instances"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#binding-instances","aria-hidden":"true"}},[s._v("#")]),s._v(" Binding Instances")]),s._v(" "),n("p",[s._v("You may also bind an existing value/object instance into the container using the instance method. The given instance will always be returned on subsequent calls into the container:")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[s._v("const")]),s._v(" button "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{attrs:{class:"token class-name"}},[s._v("BackButton")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{attrs:{class:"token keyword"}},[s._v("const")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("instance"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token function"}},[s._v("require")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'dic-js'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{attrs:{class:"token function"}},[s._v("instance")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'back-btn'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" button"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("h3",{attrs:{id:"binding-primitives"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#binding-primitives","aria-hidden":"true"}},[s._v("#")]),s._v(" Binding Primitives")]),s._v(" "),n("p",[s._v("Sometimes you may have a service that receives some injected services, but also needs an injected primitive value such as an integer. You may easily use contextual binding to inject any value your class may need:")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[s._v("const")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("when"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token function"}},[s._v("require")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'dic-js'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),n("span",{attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("application "),n("span",{attrs:{class:"token keyword"}},[s._v("in")]),s._v(" development"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{attrs:{class:"token function"}},[s._v("when")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'phone'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("needs")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'number'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("give")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'123456789'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br")])]),n("h3",{attrs:{id:"contextual-binding"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#contextual-binding","aria-hidden":"true"}},[s._v("#")]),s._v(" Contextual Binding")]),s._v(" "),n("p",[s._v("Sometimes you may have two services that depends on the same service, but you wish to inject different implementations into each services. For example, two services may depend on different implementations of the "),n("strong",[s._v("filesystem")]),s._v(" service, where one needs access to phone or cloud storage. ContainerJS provides a simple, fluent interface for defining this behavior:")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token function"}},[s._v("when")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'filemanager.sdcard'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("needs")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'filereader'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("give")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),n("span",{attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{attrs:{class:"token class-name"}},[s._v("SdCardReader")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),n("span",{attrs:{class:"token function"}},[s._v("when")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'filemanager.clouds'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("needs")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'filereader'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("give")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),n("span",{attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{attrs:{class:"token class-name"}},[s._v("CloudReader")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token operator"}},[s._v("...")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),n("span",{attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("application "),n("span",{attrs:{class:"token keyword"}},[s._v("in")]),s._v(" development"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{attrs:{class:"token function"}},[s._v("when")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'phone'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("needs")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'screen'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("give")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),n("span",{attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{attrs:{class:"token class-name"}},[s._v("ConsoleScreen")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br")])]),n("h3",{attrs:{id:"extending-service"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#extending-service","aria-hidden":"true"}},[s._v("#")]),s._v(" Extending Service")]),s._v(" "),n("p",[s._v("The "),n("code",[s._v("extend")]),s._v(" method allows the modification of resolved services. For example, when a service is resolved, you may run additional code to decorate or configure the service. The "),n("code",[s._v("extend")]),s._v(" method accepts a Closure, which should return the modified service, as its only argument:")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[s._v("const")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("extend"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token function"}},[s._v("require")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'dic-js'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{attrs:{class:"token function"}},[s._v("extend")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'screen'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" s "),n("span",{attrs:{class:"token operator"}},[s._v("=>")]),s._v(" s"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("setSize")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token operator"}},[s._v("...")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("&&")]),s._v(" s"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("h3",{attrs:{id:"anonymous-service-binding"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#anonymous-service-binding","aria-hidden":"true"}},[s._v("#")]),s._v(" Anonymous Service Binding")]),s._v(" "),n("p",[s._v("Instead of hard-coding the services id or name you can let the library do that for you\nby binding a factory only, example;")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[s._v("const")]),s._v(" "),n("span",{attrs:{class:"token function-variable function"}},[s._v("factory")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),n("span",{attrs:{class:"token operator"}},[s._v("...")]),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),n("span",{attrs:{class:"token function"}},[s._v("bind")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("factory"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{attrs:{class:"token function"}},[s._v("singleton")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("factory"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{attrs:{class:"token function"}},[s._v("instance")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("factory"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),n("span",{attrs:{class:"token operator"}},[s._v("...")]),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),n("span",{attrs:{class:"token keyword"}},[s._v("const")]),s._v(" "),n("span",{attrs:{class:"token function-variable function"}},[s._v("callMe")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("...")]),s._v("\n\n"),n("span",{attrs:{class:"token comment"}},[s._v("// The service depends on an anonymous service.")]),s._v("\n"),n("span",{attrs:{class:"token function"}},[s._v("bind")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v("[")]),s._v("factory"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token string"}},[s._v("'screen'")]),n("span",{attrs:{class:"token punctuation"}},[s._v("]")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" callMe"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br")])]),n("p",[s._v("To resolve or make an anonymous service, you pass the factory itself:")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[s._v("const")]),s._v(" obj "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token function"}},[s._v("make")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("factory"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{attrs:{class:"token keyword"}},[s._v("const")]),s._v(" obj1 "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token function"}},[s._v("make")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("callMe"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("div",{staticClass:"warning custom-block"},[n("p",{staticClass:"custom-block-title"},[s._v("WARNING")]),s._v(" "),n("p",[s._v("Typehints found on factories will always come before the defined dependencies\nin the array as arguments to the factory.")])]),s._v(" "),n("h2",{attrs:{id:"resolving"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#resolving","aria-hidden":"true"}},[s._v("#")]),s._v(" Resolving")]),s._v(" "),n("p",[s._v("The "),n("code",[s._v("make")]),s._v(" method.")]),s._v(" "),n("p",[s._v("You may use the "),n("code",[s._v("make")]),s._v(" method to resolve a service instance out of the container. The make method accepts the name of the service you wish to resolve:")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[s._v("const")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("make"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token function"}},[s._v("require")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'dic-js'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{attrs:{class:"token keyword"}},[s._v("const")]),s._v(" phone "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token function"}},[s._v("make")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'phone'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nphone"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("call")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("h3",{attrs:{id:"automatic-injection"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#automatic-injection","aria-hidden":"true"}},[s._v("#")]),s._v(" Automatic Injection")]),s._v(" "),n("p",[s._v('Alternatively, and importantly, you may "type-hint" the dependency in the body of the resolver of the service using '),n("code",[s._v("/*@container(...dependencies)*/")]),s._v(".\n")]),s._v(" "),n("p",[s._v("For example, you may type-hint a service defined by your application in another service resolver or any function. The dependencies will automatically be resolved and injected into the service/callback:")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[s._v("const")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("wrap"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token function"}},[s._v("require")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'dic-js'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{attrs:{class:"token keyword"}},[s._v("const")]),s._v(" messenger "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token function"}},[s._v("wrap")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v("[")]),n("span",{attrs:{class:"token string"}},[s._v("'phone'")]),n("span",{attrs:{class:"token punctuation"}},[s._v("]")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("p"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" msg"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=>")]),s._v(" p"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("message")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("msg"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),n("span",{attrs:{class:"token function"}},[s._v("messenger")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'hello world'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("// => hello world")]),s._v("\n"),n("span",{attrs:{class:"token comment"}},[s._v("// or")]),s._v("\n"),n("span",{attrs:{class:"token keyword"}},[s._v("const")]),s._v(" messenger "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token function"}},[s._v("wrap")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("p"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" msg"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{attrs:{class:"token comment"}},[s._v("/*@container(phone)*/")]),s._v("\n  "),n("span",{attrs:{class:"token keyword"}},[s._v("return")]),s._v(" p"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("message")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("msg"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{attrs:{class:"token comment"}},[s._v("// or")]),s._v("\n"),n("span",{attrs:{class:"token function"}},[s._v("singleton")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'database'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("config"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{attrs:{class:"token comment"}},[s._v("/*@container(config)*/")]),s._v("\n  "),n("span",{attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),n("span",{attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{attrs:{class:"token class-name"}},[s._v("Connector")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("config"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token keyword"}},[s._v("get")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token string"}},[s._v("'database.*'")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br")])])])}],!1,null,null,null);e.options.__file="introduction.md";t.default=e.exports}}]);