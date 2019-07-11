export declare function arrayWrap(v: any): any[];
export declare function isEmpty(v: any): boolean | undefined;
export declare function isFunction(v: any): boolean;
export declare function isObject(v: any): boolean;
export declare function noop(): void;
export declare function getDICKey(callback: (...args: any[]) => any): string;
export declare function hasDICKey(callback: (...args: any[]) => any): boolean;
export declare const attachKey: (factory: (...args: any[]) => any) => string;
