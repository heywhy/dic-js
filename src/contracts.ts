export interface Dictionary<T> {
  [key: string]: T
}

export interface ServiceInterface {
  shared: boolean
  dependencies: Array<string|ServiceFactory>
  factory(container?: ContainerInterface): any
}

export interface ContextualInterface extends Dictionary<ServiceFactory> {}

export interface ServiceFactory {
  (): any
  (container: ContainerInterface): any
  (...dependencies: any[]): any
}

export interface ReboundCallback {
  (container: ContainerInterface): void
  (container: ContainerInterface, value: any): void
}

export interface ResultCallback {
  (value: any, container: ContainerInterface): any
}

export interface ContextBuilderInterface {
  needs<T>(service: T|string|((...args: any[]) => any)): ContextBuilderInterface;
  give<T>(value: T|string|number|ServiceFactory): void
}

export interface RegistrarInterface {
  factory(factory: ServiceFactory): void
  deps(dependencies: Array<string|ServiceFactory>): RegistrarInterface
  dependsOn(dependencies: Array<string|ServiceFactory>): RegistrarInterface
}

export interface ContainerInterface {
  tag(dependencies: Array<string|ServiceFactory>, tags: string|string[]): void
  tagged(tag: string): any[]
  getServiceId(id: any): string
  when<T>(service: string|ServiceFactory|T): ContextBuilderInterface
  make<T>(service: string|ServiceFactory|T, parameters?: any[]): any
  alias(service: string|ServiceFactory, alias: string): void
  getAlias(alias: string): string
  isAlias(service: string): boolean
  isShared(service: string|ServiceFactory): boolean
  has(service: string|ServiceFactory): boolean
  bound(service: string|ServiceFactory): boolean
  resolved(service: string|ServiceFactory): boolean
  getBindings(): Dictionary<ServiceInterface>
  instance<T>(service: string|ServiceFactory, value: T): T
  flush(): void
  forgetInstances(): void
  forgetInstance(service: string|ServiceFactory): void
  forgetExtenders(service: string|ServiceFactory): void
  extend(service: string|ServiceFactory, callback: ResultCallback): void
  rebinding(service: string|ServiceFactory, callback: ReboundCallback): void
  resolving(service: string|ServiceFactory, callback: ResultCallback): void
  afterResolving(service: string|ServiceFactory, callback: ResultCallback): void
  bind(service: string, dependencies: Array<string|ServiceFactory>, factory: ServiceFactory): void
  bindIf(service: string, dependencies: Array<string|ServiceFactory>, factory: ServiceFactory): void
  singleton(service: string, dependencies: Array<string|ServiceFactory>, factory: ServiceFactory): void
  singletonIf(service: string, dependencies: Array<string|ServiceFactory>, factory: ServiceFactory): void
  addContextualBinding(concrete: string|ServiceFactory, service: string|ServiceFactory, factory: ServiceFactory): void
  getContextualBinding(service: string|ServiceFactory, dependency: string|ServiceFactory): ServiceFactory
  hasContextualBinding(service: string|ServiceFactory, dependency: string|ServiceFactory): boolean
}
