var is_function, is_nil;

exports.noop = function() {};

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
