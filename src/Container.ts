import { Dictionary, ContainerInterface, ServiceInterface, ServiceFactory, ReboundCallback, ResultCallback, ContextBuilderInterface, ContextualInterface } from "./contracts";
import { noop, isFunction, attachKey, isEmpty, arrayWrap } from "./utils";
import ContextBuilder from "./ContextBuilder";

export default class Container implements ContainerInterface {

  /**
   * Global container instance.
   */
  protected static instance: ContainerInterface

  /**
   * Return the global instance, if not exists create and return.
   *
   * @returns {Container}
   */
  public static getInstance(): ContainerInterface {
    if (this.instance == null) {
      this.instance = new this()
    }
    return this.instance
  }

  /**
   * Set the global instance used in application.
   *
   * @param instance
   */
  public static setInstance(instance: ContainerInterface) {
    this.instance = instance
  }

  private with: any[] = []

  /**
   * Build stack.
   */
  private serviceBuildStack: string[] = []

  /**
   * Aliases map.
   */
  protected aliases: Dictionary<string> = {}

  /**
   * Map holding list of aliases attached to a service.
   */
  protected serviceAliases: Dictionary<string[]> = {}

  /**
   * Services binded to the container.
   */
  protected services: Dictionary<ServiceInterface> = {}

  /**
   * Holds the value returned by singleton services
   * when resolved the first time.
   */
  protected instances: Dictionary<any> = {}

  /**
   * Holds the list of successfully created services.
   */
  protected resolvedServices: Dictionary<boolean> = {}

  /**
   * Hold callbacks attached to extend a service functionality.
   */
  protected extenders: Dictionary<ResultCallback[]> = {}

  /**
   * Local rebound callbacks
   */
  protected reboundCallbacks: Dictionary<ReboundCallback[]> = {}

  /**
   * Contextual bindings map.
   */
  protected contextuals: Dictionary<ContextualInterface> = {}

  /**
   * Global resolving callbacks.
   */
  protected globalResolvingCallbacks: ResultCallback[] = []

  /**
   * This holds callbacks attached to a specific service.
   */
  protected resolvingCallbacks: Dictionary<ResultCallback[]> = {}

  /**
   * Local callback to be fired after resolving a
   * service from the container
   */
  protected afterResolvingCallbacks: Dictionary<ResultCallback[]> = {}

  /**
   * Global callback to be fired after resolving a
   * service from the container
   */
  protected globalAfterResolvingCallbacks: ResultCallback[] = []

  /**
   * The map holding tagged dependencies.
   */
  protected tags: Dictionary<Array<string|ServiceFactory>> = {}

  /**
   * Assign a set of tags to a given binding.
   *
   * @param dependencies
   * @param tags
   */
  public tag(dependencies: Array<string|ServiceFactory>, tags: string|string[]) {
    [tags, dependencies] = [arrayWrap(tags), arrayWrap(dependencies)]
    for (const tag of tags) {
      if (!this.tags[tag]) {
        this.tags[tag] = []
      }
      for (const dependency of dependencies) {
        this.tags[tag].push(dependency)
      }
    }
  }

  /**
   * Resolve all of the bindings for a given tag.
   *
   * @param tag
   */
  public tagged(tag: string) {
    const result = []
    if (this.tags[tag]) {
      for (const dependency of this.tags[tag]) {
        result.push(this.make(dependency))
      }
    }
    return result
  }

  /**
   * Assign an alias to a service defined in the container
   * to allow resolving the abstract using the alias.
   *
   * @param abstract
   * @param alias
   */
  public alias(abstract: string|ServiceFactory, alias: string) {
    abstract = this.getServiceId(abstract)
    this.aliases[alias] = abstract
    if (!Array.isArray(this.serviceAliases[abstract])) {
      this.serviceAliases[abstract] = []
    }
    this.serviceAliases[abstract].push(alias)
  }

  /**
   * Get the service the alias is attached to.
   *
   * @param alias
   */
  public getAlias(alias: string): string {
    const service = this.aliases[alias]
    if (service == null) {
      return alias
    }
    if (alias === service) {
      throw new Error(`[${alias} is aliased to itself!]`)
    }
    return this.getAlias(service)
  }

  /**
   * Checks if the given value is an alias to a service
   * in the container.
   *
   * @param service
   */
  public isAlias(service: string) {
    return this.aliases[service] != null
  }

  /**
   * Checks if the given service was binded as a singleton.
   *
   * @param service
   */
  public isShared(service: string|ServiceFactory): boolean {
    const abstract = this.getAlias(this.getServiceId(service))
    return this.instances[abstract] || (
      this.services[abstract] && this.services[abstract].shared
    )
  }

  /**
   * Checks if there is a service in the container with the given name.
   *
   * @param service
   */
  public bound(service: string|ServiceFactory): boolean {
    service = this.getServiceId(service)
    return this.services[service] != null || this.instances[service] || this.getAlias(service)
  }

  /**
   * {@inheritdoc}
   */
  public has(id: string|ServiceFactory): boolean {
    return this.bound(id)
  }

  /**
   * Checks if the service has been successfully created by the container.
   *
   * @param service
   */
  public resolved(service: string|ServiceFactory): boolean {
    service = this.getServiceId(service)
    if (this.isAlias(service)) {
      service = this.getAlias(service)
    }
    return this.instances[service] || this.resolvedServices[service]
  }

  /**
   * Remove the alias from all services it is assigned to.
   *
   * @param alias
   */
  protected removeAlias(alias: string) {
    if (this.aliases[alias] == null) {
      return
    }
    Object.keys(this.serviceAliases)
      .forEach((service: string) => {
        const aliases: string[] = this.serviceAliases[service]
        const aliasIndex: number = aliases.indexOf(alias)
        if (aliasIndex > -1) {
          aliases.splice(aliasIndex, 1)
        }
      })
  }

  /**
   * Remove all resolved instances if this service is a singleton.
   *
   * @param service
   */
  protected dropStaleInstances(service: string) {
    delete this.aliases[service]
    delete this.instances[service]
    return true
  }

  /**
   * Bind a service that needs to be repeatedly resolved.
   *
   * @param service
   * @param dependencies
   * @param factory
   */
  public bind(service: string, dependencies: Array<string|ServiceFactory>, factory: ServiceFactory) {
    this.binder(service, dependencies, factory, false)
  }

  /**
   * {@inheritdoc}
   */
  public bindIf(service: string, dependencies: Array<string|ServiceFactory>, factory: ServiceFactory) {
    if (!this.bound(service)) {
      this.bind(service, dependencies, factory)
    }
  }

  /**
   * Bind a service that should be resolved once, the same value returned
   * from factory is repeatedly returned when the service is been resolved.
   *
   * @param service
   * @param dependencies
   * @param factory
   */
  public singleton(service: string, dependencies: Array<string|ServiceFactory>, factory: ServiceFactory) {
    this.binder(service, dependencies, factory)
  }

  /**
   * {@inheritdoc}
   */
  public singletonIf(service: string, dependencies: Array<string|ServiceFactory>, factory: ServiceFactory) {
    this.binder(service, dependencies, factory)
  }

  /**
   * The binds a service with a particular value, in which case
   * the value will always be returned the service is being
   * resolved from the container.
   *
   * @param service
   * @param value
   */
  public instance<T>(abstract: string|ServiceFactory, value: T): T {
    const service: string = this.getServiceId(abstract)
    this.removeAlias(service)
    delete this.aliases[service]
    const isBound = this.bound(service)
    this.instances[service] = value
    if (isBound) {
      this.rebound(service)
    }
    return value
  }

  /**
   * Adds a contextual binding to the container.
   *
   * @param concrete
   * @param service
   * @param factory
   */
  public addContextualBinding(
    concrete: string|ServiceFactory,
    service: string|ServiceFactory,
    factory: ServiceFactory
  ) {
    [concrete, service] = [
      this.getServiceId(concrete), this.getServiceId(service)
    ]
    const contexts: Dictionary<ServiceFactory> = this.contextuals[concrete] || {}
    this.contextuals[concrete] = {
      ...contexts,
      [this.getAlias(service)]: factory
    }
  }

  /**
   * Define a contextual binding.
   *
   * @param service
   */
  public when(service: string|ServiceFactory): ContextBuilderInterface {
    return new ContextBuilder(this, this.getServiceId(<any>service))
  }

  /**
   * "Extend" a service in the container.
   *
   * @param service
   * @param callback
   */
  public extend(service: string, callback: ResultCallback) {
    service = this.getAlias(this.getServiceId(service))
    if (this.instances[service]) {
      this.instances[service] = callback(this.instances[service], this)
    } else {
      this.getExtenders(service).push(callback)
      if (this.resolved(service)) {
        this.rebound(service)
      }
    }
  }

  /**
   * Bind a new callback to an abstract's rebind event.
   *
   * @param service
   * @param callback
   */
  public rebinding(service: string|ServiceFactory, callback: ReboundCallback) {
    service = this.getAlias(this.getServiceId(service))
    this.getReboundCallbacks(service).push(callback)
    if (this.bound(service)) {
      return this.make(service)
    }
  }


  /**
   * Make given service from the container by injecting dependencies if any.
   *
   * @param service
   * @param parameters
   */
  public make(service: string|ServiceFactory, parameters: any[] = []): any {
    return this.resolve(this.getServiceId(service), parameters)
  }

  /**
   * {@inheritdoc}
   */
  public get(id: string) {
    if (this.has(id)) {
      return this.resolve(id)
    }
    throw new Error(`${id} not found in the container!`)
  }

  /**
   * Returns all binded services in the container.
   */
  public getBindings() {
    return this.services
  }

  /**
   * Clears the container.
   */
  public flush() {
    this.aliases = {}
    this.services = {}
    this.instances = {}
    this.resolvedServices = {}
  }

  /**
   * Clear all instances from the container.
   */
  public forgetInstances() {
    this.instances = {}
  }

  /**
   * Delete a resolved instance from the instance cache.
   */
  public forgetInstance(service: string|ServiceFactory) {
    service = this.getServiceId(service)
    delete this.instances[service]
  }

  /**
   * Remove all of extenders for a particular service.
   *
   * @param service
   */
  public forgetExtenders(service: string|ServiceFactory) {
    service = this.getServiceId(service)
    delete this.extenders[this.getAlias(service)]
  }

  /**
   * Add resolving callback to the container.
   *
   * @param service
   * @param callback
   */
  public resolving(
    service: string|ServiceFactory|ResultCallback, callback?: ResultCallback
  ) {
    if (typeof service === 'string') {
      service = this.getAlias(this.getServiceId(service))
    }
    if (!callback) {
      this.globalResolvingCallbacks.push(<any>service)
    } else {
      if (!this.resolvingCallbacks[<string>service]) {
        this.resolvingCallbacks[<string>service] = []
      }
      this.resolvingCallbacks[<string>service].push(callback)
    }
  }

  /**
   * Add a callback to be called after a service has been resolved.
   *
   * @param service
   * @param callback
   */
  public afterResolving(
    service: string|ServiceFactory|ResultCallback,
    callback?: ResultCallback
  ) {
    if (typeof service == 'string') {
      service = this.getAlias(this.getServiceId(service))
    }
    if (!callback) {
      this.globalAfterResolvingCallbacks.push(<any>service)
    } else {
      if (!this.afterResolvingCallbacks[<string>service]) {
        this.afterResolvingCallbacks[<string>service] = []
      }
      this.afterResolvingCallbacks[<string>service].push(callback)
    }
  }

  /**
   * Get the factory for a given service.
   *
   * @param service
   */
  protected getConcrete(service: string): ServiceFactory {
    const concrete = this.getContextualFactory(service)
    if (concrete) {
      return concrete
    }
    if (this.services[service]) {
      return this.services[service].factory
    }
    return <any>service
  }

  /**
   * Get the contextual concrete binding for the given service.
   *
   * @param service
   */
  protected getContextualFactory(service: string) {
    let binding = this.findInContextualBinding(service)
    if (binding != null) {
      return binding
    }
    if (isEmpty(this.serviceAliases[service])) {
      return
    }
    for (const alias of this.serviceAliases[service]) {
      binding = this.findInContextualBinding(alias)
      if (binding) {
        return binding
      }
    }
  }

  /**
   * Checks if the service has a contextual binding
   * for the currently resolved service.
   *
   * @param service
   */
  protected findInContextualBinding(service: string) {
    const lastInStack = this.serviceBuildStack[this.serviceBuildStack.length - 1]
    const abstract = this.contextuals[lastInStack]
    return abstract && abstract[service]
  }

  /**
   * Resolve the given service from the container.
   *
   * @param service
   * @param parameters
   */
  protected resolve(service: string, parameters: any[] = []): any {
    service = this.getAlias(service)
    const needsContextualBuild = !isEmpty(parameters) || (
      this.getContextualFactory(service) != null
    )
    if (this.instances[service] && !needsContextualBuild) {
      return this.instances[service]
    }

    this.with.push(parameters)

    const concrete = this.getConcrete(service)
    let result = null
    if (needsContextualBuild) {
      result = concrete(this)
    } else {
      result = this.build(service, concrete)
    }
    for (const callback of this.getExtenders(service)) {
      result = callback(result, this)
    }
    if (this.isShared(service) && !needsContextualBuild) {
      this.instances[service] = result
    }

    this.fireResolvingCallbacks(service, result)
    this.resolvedServices[service] = true

    this.with.pop()

    return result
  }

  /**
   * Build a service by injecting the dependecies to the factory.
   *
   * @param factory
   */
  protected build(service: string, concrete: ServiceFactory) {
    const binding: ServiceInterface = this.services[service]
    if (!binding) {
      throw new Error(`Service [${service}] not found in the container!`)
    }
    const {dependencies} = binding
    this.serviceBuildStack.push(service)
    const deps = this.resolveDependencies(dependencies)
    if (deps.length < 1) {
      deps.push(this)
    }
    this.serviceBuildStack.pop()

    return concrete(...deps)
  }

  /**
   * Resolve the given dependencies from the container.
   *
   * @param dependencies
   */
  protected resolveDependencies(dependencies: Array<string|ServiceFactory>): any[] {
    const results: any[] = []
    for (const dependency of dependencies) {
      results.push(this.resolve(this.getServiceId(dependency)))
    }
    return results
  }

  /**
   * Fire resolving callbacks.
   *
   * @param service
   * @param result
   */
  protected fireResolvingCallbacks(service: string, result: any) {
    this.fireCallbackArray(result, this.globalResolvingCallbacks)
    this.fireCallbackArray(
      result,
      this.getCallbacksForService(service, this.resolvingCallbacks)
    )
    this.fireAfterResolvingCallbacks(service, result)
  }

  /**
   * Fire all after resolving callbacks.
   *
   * @param service
   * @param result
   */
  protected fireAfterResolvingCallbacks(service: string, result: any) {
    this.fireCallbackArray(result, this.globalAfterResolvingCallbacks)
    this.fireCallbackArray(
      result,
      this.getCallbacksForService(service, this.afterResolvingCallbacks)
    )
  }

  /**
   * Returns the callbacks for the given service.
   *
   * @param service
   * @param callbacksForService
   */
  protected getCallbacksForService(
    service: string, callbacksForService: Dictionary<ResultCallback[]>
  ): ResultCallback[] {
    const callbacks: ResultCallback[] = []
    Object.keys(callbacksForService)
      .forEach((k: string) => {
        if (this.getAlias(k) == service || service == k) {
          callbacks.push(...callbacksForService[k])
        }
      })
    return callbacks
  }

  /**
   * Call the callbacks in the given array passing the given result.
   *
   * @param result
   * @param callbacks
   */
  protected fireCallbackArray(result: any, callbacks: ResultCallback[]) {
    for (const callback of callbacks) {
      callback(result, this)
    }
  }

  /**
   * Get all extenders for a given service.
   *
   * @param service
   */
  protected getExtenders(service: string): ResultCallback[] {
    return this.extenders[service] || (this.extenders[service] = [])
  }

  /**
   * Calls all rebound callbacks attached to the service.
   *
   * @param service
   */
  protected rebound(service: string) {
    const newValue = this.make(service)
    for (const callback of this.getReboundCallbacks(service)) {
      callback(this, newValue)
    }
  }

  /**
   *
   * @param service
   * @param dependencies
   * @param factory
   * @param shared
   */
  protected binder(
    service: string|ServiceFactory,
    dependencies: Array<string|ServiceFactory>,
    factory: ServiceFactory = noop,
    shared = true
  ) {
    let abstract: string = this.getServiceId(service)
    this.dropStaleInstances(abstract)
    if (!Array.isArray(dependencies)) {
      factory = dependencies
      dependencies = []
    }
    this.services[abstract] = {
      shared,
      factory,
      dependencies
    }
    if (this.resolved(abstract)) {
      this.rebound(abstract)
    }
  }

  /**
   * Get the auto-generated id if the parameter
   * is a function/factory
   *
   * @param id
   */
  public getServiceId(id: any): string {
    const abstract: string = isFunction(id)
      ? attachKey(<ServiceFactory>id) : <string>id
    return String(abstract)
  }

  /**
   * Return callbacks.
   *
   * @param service
   */
  protected getReboundCallbacks(service: string) {
    const callbacks: ReboundCallback[] = this.reboundCallbacks[service]
    return Array.isArray(callbacks)
      ? callbacks : (this.reboundCallbacks[service] = [])
  }
}

export {Container}
