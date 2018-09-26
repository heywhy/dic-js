import { Dictionary, ContainerInterface, ServiceInterface, ServiceFactory, ReboundCallback, ResultCallback, ContextBuilderInterface, ContextualInterface } from "./contracts";
export default class Container implements ContainerInterface {
    /**
     * Global container instance.
     */
    protected static instance: ContainerInterface;
    /**
     * Return the global instance, if not exists create and return.
     *
     * @returns {Container}
     */
    static getInstance(): ContainerInterface;
    /**
     * Set the global instance used in application.
     *
     * @param instance
     */
    static setInstance(instance: ContainerInterface): void;
    private with;
    /**
     * Build stack.
     */
    private serviceBuildStack;
    /**
     * Aliases map.
     */
    protected aliases: Dictionary<string>;
    /**
     * Map holding list of aliases attached to a service.
     */
    protected serviceAliases: Dictionary<string[]>;
    /**
     * Services binded to the container.
     */
    protected services: Dictionary<ServiceInterface>;
    /**
     * Holds the value returned by singleton services
     * when resolved the first time.
     */
    protected instances: Dictionary<any>;
    /**
     * Holds the list of successfully created services.
     */
    protected resolvedServices: Dictionary<boolean>;
    /**
     * Hold callbacks attached to extend a service functionality.
     */
    protected extenders: Dictionary<ResultCallback[]>;
    /**
     * Local rebound callbacks
     */
    protected reboundCallbacks: Dictionary<ReboundCallback[]>;
    /**
     * Contextual bindings map.
     */
    protected contextuals: Dictionary<ContextualInterface>;
    /**
     * Global resolving callbacks.
     */
    protected globalResolvingCallbacks: ResultCallback[];
    /**
     * This holds callbacks attached to a specific service.
     */
    protected resolvingCallbacks: Dictionary<ResultCallback[]>;
    /**
     * Local callback to be fired after resolving a
     * service from the container
     */
    protected afterResolvingCallbacks: Dictionary<ResultCallback[]>;
    /**
     * Global callback to be fired after resolving a
     * service from the container
     */
    protected globalAfterResolvingCallbacks: ResultCallback[];
    /**
     * Assign an alias to a service defined in the container
     * to allow resolving the abstract using the alias.
     *
     * @param abstract
     * @param alias
     */
    alias(abstract: string | ServiceFactory, alias: string): void;
    /**
     * Get the service the alias is attached to.
     *
     * @param alias
     */
    getAlias(alias: string): string;
    /**
     * Checks if the given value is an alias to a service
     * in the container.
     *
     * @param service
     */
    isAlias(service: string): boolean;
    /**
     * Checks if the given service was binded as a singleton.
     *
     * @param service
     */
    isShared(service: string | ServiceFactory): boolean;
    /**
     * Checks if there is a service in the container with the given name.
     *
     * @param service
     */
    bound(service: string | ServiceFactory): boolean;
    /**
     * {@inheritdoc}
     */
    has(id: string | ServiceFactory): boolean;
    /**
     * Checks if the service has been successfully created by the container.
     *
     * @param service
     */
    resolved(service: string | ServiceFactory): boolean;
    /**
     * Remove the alias from all services it is assigned to.
     *
     * @param alias
     */
    removeAlias(alias: string): void;
    /**
     * Remove all resolved instances if this service is a singleton.
     *
     * @param service
     */
    protected dropStaleInstances(service: string): boolean;
    /**
     * Bind a service that needs to be repeatedly resolved.
     *
     * @param service
     * @param dependencies
     * @param factory
     */
    bind(service: string, dependencies: Array<string | ServiceFactory>, factory: ServiceFactory): void;
    /**
     * {@inheritdoc}
     */
    bindIf(service: string, dependencies: Array<string | ServiceFactory>, factory: ServiceFactory): void;
    /**
     * Bind a service that should be resolved once, the same value returned
     * from factory is repeatedly returned when the service is been resolved.
     *
     * @param service
     * @param dependencies
     * @param factory
     */
    singleton(service: string, dependencies: Array<string | ServiceFactory>, factory: ServiceFactory): void;
    /**
     * {@inheritdoc}
     */
    singletonIf(service: string, dependencies: Array<string | ServiceFactory>, factory: ServiceFactory): void;
    /**
     * The binds a service with a particular value, in which case
     * the value will always be returned the service is being
     * resolved from the container.
     *
     * @param service
     * @param value
     */
    instance<T>(abstract: string | ServiceFactory, value: T): T;
    /**
     * Adds a contextual binding to the container.
     *
     * @param concrete
     * @param service
     * @param factory
     */
    addContextualBinding(concrete: string | ServiceFactory, service: string | ServiceFactory, factory: ServiceFactory): void;
    /**
     * Define a contextual binding.
     *
     * @param service
     */
    when(service: string | ServiceFactory): ContextBuilderInterface;
    /**
     * "Extend" a service in the container.
     *
     * @param service
     * @param callback
     */
    extend(service: string, callback: ResultCallback): void;
    /**
     * Bind a new callback to an abstract's rebind event.
     *
     * @param service
     * @param callback
     */
    rebinding(service: string | ServiceFactory, callback: ReboundCallback): any;
    /**
     * Make given service from the container by injecting dependencies if any.
     *
     * @param service
     * @param parameters
     */
    make(service: string | ServiceFactory, parameters?: any[]): any;
    /**
     * {@inheritdoc}
     */
    get(id: string): any;
    /**
     * Returns all binded services in the container.
     */
    getBindings(): Dictionary<ServiceInterface>;
    /**
     * Clears the container.
     */
    flush(): void;
    /**
     * Clear all instances from the container.
     */
    forgetInstances(): void;
    /**
     * Delete a resolved instance from the instance cache.
     */
    forgetInstance(service: string | ServiceFactory): void;
    /**
     * Remove all of extenders for a particular service.
     *
     * @param service
     */
    forgetExtenders(service: string | ServiceFactory): void;
    /**
     * Add resolving callback to the container.
     *
     * @param service
     * @param callback
     */
    resolving(service: string | ServiceFactory | ResultCallback, callback?: ResultCallback): void;
    /**
     * Add a callback to be called after a service has been resolved.
     *
     * @param service
     * @param callback
     */
    afterResolving(service: string | ServiceFactory | ResultCallback, callback?: ResultCallback): void;
    /**
     * Get the factory for a given service.
     *
     * @param service
     */
    protected getConcrete(service: string): ServiceFactory;
    /**
     * Get the contextual concrete binding for the given service.
     *
     * @param service
     */
    protected getContextualFactory(service: string): ServiceFactory | undefined;
    /**
     * Checks if the service has a contextual binding
     * for the currently resolved service.
     *
     * @param service
     */
    protected findInContextualBinding(service: string): ServiceFactory;
    /**
     * Resolve the given service from the container.
     *
     * @param service
     * @param parameters
     */
    protected resolve(service: string, parameters?: any[]): any;
    /**
     * Build a service by injecting the dependecies to the factory.
     *
     * @param factory
     */
    protected build(service: string, concrete: ServiceFactory): any;
    /**
     * Resolve the given dependencies from the container.
     *
     * @param dependencies
     */
    protected resolveDependencies(dependencies: string[]): any[];
    /**
     * Fire resolving callbacks.
     *
     * @param service
     * @param result
     */
    protected fireResolvingCallbacks(service: string, result: any): void;
    /**
     * Fire all after resolving callbacks.
     *
     * @param service
     * @param result
     */
    protected fireAfterResolvingCallbacks(service: string, result: any): void;
    /**
     * Returns the callbacks for the given service.
     *
     * @param service
     * @param callbacksForService
     */
    protected getCallbacksForService(service: string, callbacksForService: Dictionary<ResultCallback[]>): ResultCallback[];
    /**
     * Call the callbacks in the given array passing the given result.
     *
     * @param result
     * @param callbacks
     */
    protected fireCallbackArray(result: any, callbacks: ResultCallback[]): void;
    /**
     * Get all extenders for a given service.
     *
     * @param service
     */
    protected getExtenders(service: string): ResultCallback[];
    /**
     * Calls all rebound callbacks attached to the service.
     *
     * @param service
     */
    protected rebound(service: string): void;
    /**
     *
     * @param service
     * @param dependencies
     * @param factory
     * @param shared
     */
    protected binder(service: string | ServiceFactory, dependencies: Array<string | ServiceFactory>, factory?: ServiceFactory, shared?: boolean): void;
    /**
     * Get the auto-generated id if the parameter
     * is a function/factory
     *
     * @param id
     */
    getServiceId(id: any): string;
    /**
     * Attach the service name as property so that it can be resolved
     * accessing it as a property on the container, e.g. container[service].
     *
     * @param service
     */
    protected bindServiceAsProps(service: string): void;
    /**
     * Return callbacks.
     *
     * @param service
     */
    protected getReboundCallbacks(service: string): ReboundCallback[];
}
export { Container };
