import { ContextBuilderInterface, ContainerInterface, ServiceFactory } from "./contracts";
import { isFunction, getDICKey } from "./utils";

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
    this.container.addContextualBinding(this.service, needs, <ServiceFactory>factory)
  }
}
