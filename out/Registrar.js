"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Registrar = /** @class */ (function () {
    function Registrar(container, service, singleton) {
        if (singleton === void 0) { singleton = true; }
        this.container = container;
        this.service = service;
        this.singleton = singleton;
        this.dependencies = [];
    }
    Registrar.prototype.dependsOn = function (dependencies) {
        this.dependencies = dependencies;
        return this;
    };
    Registrar.prototype.deps = function (dependencies) {
        return this.dependsOn(dependencies);
    };
    Registrar.prototype.factory = function (factory) {
        var service = this.container.getServiceId(this.service);
        if (this.singleton) {
            this.container.singleton(service, this.dependencies, factory);
        }
        else {
            this.container.bind(service, this.dependencies, factory);
        }
    };
    return Registrar;
}());
exports.Registrar = Registrar;
exports.default = Registrar;
