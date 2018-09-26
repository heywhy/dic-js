import { RegistrarInterface, ContainerInterface, ServiceFactory } from "./contracts";
export default class Registrar implements RegistrarInterface {
    protected container: ContainerInterface;
    protected service: string | ServiceFactory;
    protected singleton: boolean;
    protected dependencies: Array<string | ServiceFactory>;
    constructor(container: ContainerInterface, service: string | ServiceFactory, singleton?: boolean);
    dependsOn(dependencies: Array<string | ServiceFactory>): this;
    deps(dependencies: Array<string | ServiceFactory>): this;
    factory(factory: ServiceFactory): void;
}
export { Registrar };
