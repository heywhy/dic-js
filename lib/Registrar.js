var Registrar, array_wrap, noop;

({noop, array_wrap} = require('./utils'));

Registrar = (function() {
  class Registrar {
    
    constructor(container, abstract, singleton = false) {
      this.container = container;
      this.abstract = abstract;
      this.singleton = singleton;
    }

    
    deps(_deps = []) {
      this._deps = _deps;
      return this;
    }

    
    factory(factory = noop) {
      var deps;
      deps = array_wrap(this._deps);
      if (this.singleton) {
        return this.container.singleton(this.abstract, deps, factory);
      } else {
        return this.container.bind(this.abstract, deps, factory);
      }
    }

  };

  
  Registrar.prototype._deps = null;

  return Registrar;

}).call(this);

exports.Registrar = Registrar;
