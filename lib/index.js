var Container, Context, contexts, defaultContext;

({Context} = require('./Context'));

({Container} = require('./Container'));

defaultContext = new Context(Container.getInstance());

contexts = {};

exports.getContext = function(id) {
  if (contexts[id]) {
    return contexts[id];
  }
  return contexts[id] = new Context(new Container);
};

exports.bind = function(...args) {
  return defaultContext.bind(...args);
};

exports.singleton = function(...args) {
  return defaultContext.singleton(...args);
};

exports.instance = function(...args) {
  return defaultContext.instance(...args);
};

exports.extend = function(...args) {
  return defaultContext.extend(...args);
};

exports.wrap = function(...args) {
  return defaultContext.wrap(...args);
};

exports.resolve = function(...args) {
  return defaultContext.resolve(...args);
};

exports.make = function(...args) {
  return defaultContext.make(...args);
};

exports.when = function(abstract) {
  return defaultContext.make(abstract);
};
