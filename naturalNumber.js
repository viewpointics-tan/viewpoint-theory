const parser = require("./parser0823");
const array = parser.parse("(v0,(addA,addA)')'");

const list = {
  v0: "v0",
  id: x => x,
  lift: x => [x],
  addA: x => x.concat("a"),
  f: x => [x, "f"]
};
const keys = Object.keys(list);

function eva(x) {
  if (x[2] === "'") {
    if (typeof x[0] === "string") {
      if (typeof x[1] === "string") {
        return quote([x[0], x[1]]);
      } else {
        return quote([x[0], eva(x[1])]);
      }
    } else {
      if (typeof x[1] === "string") {
        return quote([eva(x[0]), x[1]]);
      } else {
        return quote([eva(x[0]), eva(x[1])]);
      }
    }
  } else {
    if (typeof x[0] === "string") {
      if (typeof x[1] === "string") {
        return [x[0], x[1]];
      } else {
        return [x[0], eva(x[1])];
      }
    } else {
      if (typeof x[1] === "string") {
        return [eva(x[0]), x[1]];
      } else {
        return [eva(x[0]), eva(x[1])];
      }
    }
  }
}

function quote(x) {
  return apply(getVal(x[0]), getVal(x[1]));
}

function apply(x, y) {
  // console.log(x, y);
  if (typeof y === "function") {
    if (typeof x === "function") {
      fun = function(arg) {
        return y(x(arg));
      };
      return fun;
    } else {
      return y(x);
    }
  } else if (typeof x !== "function" && typeof y[0] === "function") {
    if (y.length === 1) {
      return [y[0](x)];
    } else {
      return apply(getVal(y[0](x)), getVal(y[1]));
    }
  } else {
    return [x, y];
  }
}

function getVal(x) {
  if (
    keys.find(el => {
      return el === x;
    }) !== undefined
  ) {
    return list[x];
  } else {
    return x;
  }
}

console.log(eva(array));
