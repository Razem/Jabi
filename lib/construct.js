'use strict';
var
Aux = require("./auxiliary");

/** @module jabi/lib/construct */

/**
 * @typedef config
 * @property {Function} init The constructor function
 * @property {Object} [proto] The prototype of the constructor
 * @property {constructor} [inherit] An inherited constructor
 * @property {Object} [own] An object of static properties
 * @property {Object[]} [mixin] An array of mixins
 */

/**
 * @callback superCall
 * @param {String} methodName
 * @param {Array} [args]
 */

/**
 * @typedef construct
 * @type {Function}
 * @property {Function} [Super] The inherited constructor
 * @property {Function} [superInit] A method which calls the inherited constructor with given arguments.
 * @property {superCall} [superCall] A method which calls an inherited method.
 */

/**
 * A function which generates a special constructor using the data argument.
 * @alias module:jabi/lib/construct
 * @param {config}
 * @returns {construct}
 */
function construct(data) {
  var
  Con = data.init,
  Super = data.inherit,
  own = data.own,
  mixin = data.mixin,
  proto = data.proto;

  if (Super) {
    inherits(Con, Super);
    Aux.assignToFunction(Con, Super);
  }

  if (mixin) {
    for (var i = 0, j = mixin.length; i < j; ++i) {
      Aux.assign(Con.prototype, mixin[i]);
    }
  }

  if (proto) {
    if (Super || mixin) {
      Aux.assign(Con.prototype, proto);
    }
    else {
      Con.prototype = proto;
    }
  }

  if (own) {
    Aux.assignToFunction(Con, own);
  }

  Con.prototype.constructor = Con;

  return Con;
}

// This function is used to call the super constructor (in inherited constructs)
function superInit() {
  var
  sup = this.Super,
  proto = sup.prototype;

  this.Super = proto.Super;
  sup.apply(this, arguments);
  this.Super = sup;
}

// This method calls a method of the super construct
function superCall(name, args) {
  var
  sup = this.Super,
  proto = sup.prototype;

  this.Super = proto.Super;
  var res = proto[name].apply(this, args);
  this.Super = sup;

  return res;
}

// This method is used for the inheritance using the Object.create for the prototype
function inherits(Con, Super) {
  var proto = Con.prototype = Aux.inherit(Super.prototype);

  proto.Super = Super;
  proto.superInit = superInit;
  proto.superCall = superCall;
}

module.exports = construct;
