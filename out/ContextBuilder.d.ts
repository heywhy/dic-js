import { ContextBuilderInterface, ContainerInterface, ServiceFactory } from "./contracts";
export default class ContextBuilder implements ContextBuilderInterface {
    protected container: ContainerInterface;
    protected service: string;
    protected _needs: any;
    constructor(container: ContainerInterface, service: string);
    needs(service: string | ServiceFactory): ContextBuilderInterface;
    give(factory: string | number | ServiceFactory): void;
}
