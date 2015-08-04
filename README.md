# Jabi

Tiny objective library.

## Example:

### construct
```
var construct = require("jabi/lib/construct");

var A = construct({
  init: function (a) {
    this.a = a;
  },

  proto: {
    toString: function () {
      return "a: " + this.a;
    }
  }
});

var Show = {
  show: function () {
    alert(this.a + ", " + this.b);
  }
};

var B = construct({
  inherit: A,

  init: function (a, b) {
    this.superInit(a);

    this.b = b;
  },

  proto: {
    toString: function () {
      return this.superCall("toString") + ", b: " + this.b;
    }
  },

  mixin: [Show],

  own: {
    create: function (a, b) {
      return new B(a, b);
    }
  }
});
```

### struct
```
var struct = require("jabi/lib/struct");

// A simple struct with properties
var Point = struct("x", "y", "z");
var p = new Point(1, 2, 3); // x = 1, y = 2, z = 3

// A struct with a custom prototype
var Point = struct(["x", "y", "z"], {
  x: 0,
  y: 0,
  z: 0,
  toString: function () {
    return this.x + ":" + this.y + ":" + this.z;
  }
});

var p1 = new Point(1, 2, 3);
p1.toString() === "1:2:3";

var p2 = new Point(1, 2);
p2.toString() === "1:2:0";
```

## Installation:
```
npm install jabi
```

## Compatible with:
- Node.js
- Browserify
