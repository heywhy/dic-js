import Container from "./Container";
import { ContainerInterface, ServiceFactory } from "./contracts";
import Registrar from "./Registrar";
export { Container };
export declare const getContext: (id?: string | undefined) => ContainerInterface;
export declare const bind: (service: string | ServiceFactory, container?: ContainerInterface) => Registrar;
export declare const singleton: (service: string | ServiceFactory, container?: ContainerInterface) => Registrar;
export declare const make: (service: string | ServiceFactory, container?: ContainerInterface | undefined) => any;
