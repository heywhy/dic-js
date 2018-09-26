import Container from "./Container";
import { Dictionary, ContainerInterface, ServiceFactory } from "./contracts";
import Registrar from "./Registrar";

export {Container}

const contexts: Dictionary<ContainerInterface> = {}

export const getContext = (id?: string): ContainerInterface => {
  if (!id) {
    return Container.getInstance()
  }
  return contexts[id] ? contexts[id] : (contexts[id] = new Container())
}

export const bind = (
  service: string|ServiceFactory,
  container = Container.getInstance()
) => new Registrar(container, service, false)

export const singleton = (
  service: string|ServiceFactory,
  container = Container.getInstance()
) => new Registrar(container, service)

export const make = (
  service: string|ServiceFactory,
  container?: ContainerInterface
) => (container || getContext()).make(service)
