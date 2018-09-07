var ContextBuilder, getDICKey, noop;

({noop, getDICKey} = require('./utils'));

ContextBuilder = (function() {
  class ContextBuilder {
    /**
     *
     */
    // coffeelint: disable=no_empty_functions
    constructor(container, concrete) {
      this.container = container;
      this.concrete = getDICKey(concrete) || concrete;
    }

    /**
     *
     */
    needs(tag) {
      this._needs = getDICKey(tag) || tag;
      return this;
    }

    /**
     *
     */
    give(factory = noop) {
      return this.container.addContextualBinding(this.concrete, this._needs, factory);
    }

  };

  
  ContextBuilder.prototype._needs = null;

  return ContextBuilder;

}).call(this);

exports.ContextBuilder = ContextBuilder;
