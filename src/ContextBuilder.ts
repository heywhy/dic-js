import { ContextBuilderInterface, ContainerInterface, ServiceFactory } from "./contracts";
import { isFunction, getDICKey, hasDICKey } from "./utils";

export default class ContextBuilder implements ContextBuilderInterface {

  protected _needs: any = null

  constructor(
    protected container: ContainerInterface,
    protected service: string
  ) {}

  public needs(service: string|ServiceFactory): ContextBuilderInterface {
    this._needs = service
    return this
  }

  public give(factory: string|number|ServiceFactory) {
    if (!isFunction(factory)) {
      const value = factory
      factory = () => value
    }
    const needs: string = getDICKey(<any>this._needs) || <string>this._needs
    if (hasDICKey(factory as ServiceFactory)) {
      const key = getDICKey(factory as any)
      factory = ((container: ContainerInterface) => container.make(key)) as ServiceFactory
    }
    this.container.addContextualBinding(this.service, needs, <ServiceFactory>factory)
  }
}
