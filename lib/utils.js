// coffeelint: disable=no_empty_functions
var is_function, is_nil, typehintRE;

exports.noop = function() {};

// coffeelint: disable=no_empty_functions
exports.is_nil = is_nil = function(v) {
  return v === null || v === void 0;
};

exports.is_object = function(v) {
  return typeof v === 'object';
};

exports.is_function = is_function = function(v) {
  return typeof v === 'function';
};

exports.array_wrap = function(v) {
  if (is_nil(v)) {
    return [];
  }
  if (!Array.isArray(v)) {
    return [v];
  } else {
    return v;
  }
};

exports.wrap_func = function(v) {
  if (is_function(v)) {
    return v;
  } else {
    return function() {
      return v;
    };
  }
};

typehintRE = /\/\*\s*@container\(([a-z0-9,\s]+)\)\s*\*\//i;

exports.getDeps = function(v) {
  var match, str;
  str = v.toString();
  match = str.match(typehintRE);
  if (match && match[1]) {
    return match[1].split(',').map(function(v) {
      return v.trim();
    });
  } else {
    return [];
  }
};
