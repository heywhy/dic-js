"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
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
                for (var index = 0; index < deps.length; index++) {
                    var dep = deps[index];
                    try {
                        if (Array.isArray(dep)) {
                            var dep1 = dep[0], context = dep[1];
                            args.push(_1.make(dep1, _1.getContext(context)));
                        }
                        else {
                            args.push(_1.make(dep, _1.getContext()));
                        }
                        break;
                    }
                    catch (e) {
                        if (index + 1 == deps.length)
                            throw e;
                    }
                }
                var klass = target;
                return new (klass.bind.apply(klass, [void 0].concat(args)))();
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
