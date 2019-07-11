"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrayWrap(v) {
    if (v == null) {
        return [];
    }
    return Array.isArray(v) ? v : [v];
}
exports.arrayWrap = arrayWrap;
function isEmpty(v) {
    if (v == null)
        return true;
    if (Array.isArray(v)) {
        return v.length < 1;
    }
}
exports.isEmpty = isEmpty;
function isFunction(v) {
    return typeof v === 'function';
}
exports.isFunction = isFunction;
function isObject(v) {
    return !isFunction(v) && typeof v === 'object';
}
exports.isObject = isObject;
function noop() { }
exports.noop = noop;
var NEXT_KEY = 0;
var CONTAINER_KEY = '__$DICJS$__';
function getDICKey(callback) {
    return callback[CONTAINER_KEY] || String(callback);
}
exports.getDICKey = getDICKey;
function hasDICKey(callback) {
    return callback[CONTAINER_KEY] != null;
}
exports.hasDICKey = hasDICKey;
var generateDICKey = function () { return CONTAINER_KEY + "-" + NEXT_KEY++; };
exports.attachKey = function (factory) {
    if (!factory[CONTAINER_KEY]) {
        factory[CONTAINER_KEY] = generateDICKey();
    }
    return factory[CONTAINER_KEY];
};
