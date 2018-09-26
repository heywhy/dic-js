import { RegistrarInterface, ContainerInterface, ServiceFactory } from "./contracts";

export default class Registrar implements RegistrarInterface {

  protected dependencies: Array<string|ServiceFactory> = []

  constructor(
    protected container: ContainerInterface,
    protected service: string|ServiceFactory,
    protected singleton: boolean = true
  ) {}

  dependsOn(dependencies: Array<string|ServiceFactory>) {
    this.dependencies = dependencies
    return this
  }

  deps(dependencies: Array<string|ServiceFactory>) {
    return this.dependsOn(dependencies)
  }

  factory(factory: ServiceFactory) {
    const service: string = this.container.getServiceId(this.service)
    if (this.singleton) {
      this.container.singleton(service, this.dependencies, factory)
    } else {
      this.container.bind(service, this.dependencies, factory)
    }
  }
}

export {Registrar}
