"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var ContextBuilder = /** @class */ (function () {
    function ContextBuilder(container, service) {
        this.container = container;
        this.service = service;
        this._needs = null;
    }
    ContextBuilder.prototype.needs = function (service) {
        this._needs = service;
        return this;
    };
    ContextBuilder.prototype.give = function (factory) {
        if (!utils_1.isFunction(factory)) {
            var value_1 = factory;
            factory = function () { return value_1; };
        }
        var needs = utils_1.getDICKey(this._needs) || this._needs;
        if (utils_1.hasDICKey(factory)) {
            var key_1 = utils_1.getDICKey(factory);
            factory = (function (container) { return container.make(key_1); });
        }
        this.container.addContextualBinding(this.service, needs, factory);
    };
    return ContextBuilder;
}());
exports.default = ContextBuilder;
