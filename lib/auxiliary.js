'use strict';

var
ObjectProto = Object.prototype,
ObjectHas = ObjectProto.hasOwnProperty,
ObjectToString = ObjectProto.toString;

var has = exports.has = function (obj, key) {
  return ObjectHas.call(obj, key);
};

exports.inherit = Object.create || function (proto) {
  var Empty = function () {};
  Empty.prototype = proto;
  return new Empty();
};

var assign = exports.assign = Object.assign || function (obj, ext) {
  for (var i in ext) if (has(ext, i)) {
    obj[i] = ext[i];
  }
};

exports.assignToFunction = function (fn, ext) {
  var proto = fn.prototype;
  assign(fn, ext);
  fn.prototype = proto;
};

exports.isArray = Array.isArray || function (obj) {
  return ObjectToString.call(obj) === "[object Array]";
};
