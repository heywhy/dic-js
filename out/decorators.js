"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var utils_1 = require("./utils");
var depKey = '$$---DEP---$$';
var deleteDeps = function (d) { return delete d[depKey]; };
var getDeps = function (d) { return d[depKey] || (d[depKey] = []); };
var decorator = function (target, single) {
    if (single === void 0) { single = true; }
    var container = _1.getContext();
    if (typeof target === 'string' || Array.isArray(target)) {
        var containers = Array.isArray(target) ? target : [target];
        return factory(containers.map(_1.getContext), single);
    }
    factory([container], single)(target);
};
function Bind(target) {
    return decorator(target, false);
}
exports.Bind = Bind;
function Singleton(target) {
    return decorator(target);
}
exports.Singleton = Singleton;
var factory = function (containers, instance) {
    return function (target) {
        var deps = getDeps(target);
        deleteDeps(target);
        containers.forEach(function (container) {
            var registrar = instance
                ? _1.singleton(target, container)
                : _1.bind(target, container);
            registrar.factory(function () {
                var args = [];
                deps.forEach(function (dep) {
                    var dep1 = dep[0], contexts = dep[1];
                    contexts = utils_1.arrayWrap(contexts || [undefined]);
                    contexts.some(function (context, i) {
                        try {
                            var container_1 = _1.getContext(context);
                            if (container_1.hasContextualBinding(target, dep1)) {
                                var result = container_1.getContextualBinding(target, dep1)(container_1);
                                args.push(result);
                            }
                            else {
                                args.push(_1.make(dep1, container_1));
                            }
                            return true;
                        }
                        catch (e) {
                            if (i + 1 == contexts.length)
                                throw e;
                        }
                        return false;
                    });
                });
                var klass = target;
                return new (klass.bind.apply(klass, __spreadArrays([void 0], args)))();
            });
        });
    };
};
function Make(dep, contexts) {
    return function (target, propertyKey, index) {
        getDeps(target).push([dep, contexts]);
    };
}
exports.Make = Make;
