const parser = require("./parser0823");
const array = parser.parse("((v0,f)',f)'");

const list = {
  v0: "v0",
  id: x => x,
  addq: x => x + "q",
  lift: x => [x],
  f: x => [x, "f"]
};

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
  if (typeof y == "function") {
    return y(x);
  } else if (typeof x !== "function" && typeof y[0] === "function") {
    return apply(y[0](x), y[1]);
  } else {
    return [x, y];
  }
}

function getVal(x) {
  if (list[x] !== undefined) {
    return list[x];
  } else {
    return x;
  }
}

console.log(eva(array));
