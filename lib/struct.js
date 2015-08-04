'use strict';
var
Aux = require("./auxiliary");

/** @module jabi/lib/struct */

/**
 * Easily generates a constructor based on given keys, prototype and type definition.
 * @alias module:jabi/lib/struct
 * @param {String[]} keys If just keys are given, the array is not necessary.
 * @param {Object} [prototype]
 * @returns {constructor}
 */
function struct(keysArr, proto) {
  var keys = arguments, setProto = false;

  if (Aux.isArray(keysArr)) {
    keys = keysArr;
    setProto = true;
  }

  var Con = function () {
    fill(this, keys, arguments);
  };

  if (setProto && proto) {
    proto.constructor = Con;
    Con.prototype = proto;
  }

  return Con;
}

// A function that fills properties with values
function fill(obj, keys, values) {
  for (var i = 0; i < keys.length; ++i) {
    var key = keys[i];

    if (values[i] !== undefined) {
      obj[key] = values[i];
    }
  }
}

module.exports = struct;
