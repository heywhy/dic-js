import Container from "./Container";
import { ContainerInterface, ServiceFactory } from "./contracts";
import Registrar from "./Registrar";
export { Container };
export declare const getContext: (id?: string | undefined) => ContainerInterface;
export declare const bind: <T>(service: string | T | ServiceFactory, container?: ContainerInterface) => Registrar<T>;
export declare const singleton: <T>(service: string | ServiceFactory | T, container?: ContainerInterface) => Registrar<T>;
export declare const make: <T>(service: string | ServiceFactory | T, container?: ContainerInterface | undefined) => any;
