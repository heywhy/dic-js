"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __importDefault(require("./Container"));
exports.Container = Container_1.default;
var Registrar_1 = __importDefault(require("./Registrar"));
__export(require("./decorators"));
var contexts = {};
exports.getContext = function (id) {
    if (!id) {
        return Container_1.default.getInstance();
    }
    return contexts[id] ? contexts[id] : (contexts[id] = new Container_1.default());
};
exports.bind = function (service, container) {
    if (container === void 0) { container = Container_1.default.getInstance(); }
    return new Registrar_1.default(container, service, false);
};
exports.singleton = function (service, container) {
    if (container === void 0) { container = Container_1.default.getInstance(); }
    return new Registrar_1.default(container, service);
};
exports.make = function (service, container) { return (container || exports.getContext()).make(service); };
