export declare function Bind(target: InstanceType<any>): any;
export declare function Bind(target: string | string[]): (target: InstanceType<any>) => any;
export declare function Singleton(target: InstanceType<any>): any;
export declare function Singleton(target: string | string[]): (target: Function) => void;
export declare function Make(dep: string | InstanceType<any>, contexts?: string | string[]): (target: any, propertyKey: string | symbol, index: number) => any;
