const parser = require("./parser0823");
const array = parser.parse("((f,dif),(((f,f),f),dif)')'");
// "((f,f),(f,sub)')'"
const list = {
  v0: "v0",
  id: x => x,
  lift: x => [x],
  addA: x => x.concat("a"),
  f: x => [x, "f"],
  isPositive: x => {
    if (x === "f" || x[1] === "f") {
      return true;
    } else if (x[1] === "dif") {
      return false;
    } else {
      throw "argument is not valid number.";
    }
  },
  sum: x => {
    if (x === "id") {
      return "id";
    } else {
      return function(y) {
        if (x === "f") {
          return quote([y, "f"]);
        } else if (x[1] === "f") {
          return list.sum(x[0])(quote([y, "f"]));
        } else if (list.isPositive(x) === false && list.isPositive(y)) {
          return list.dif(x[0])(y);
        } else if (list.isPositive(x) && list.isPositive(y) === false) {
          return list.dif(y[0])(x);
        } else if (
          list.isPositive(x) === false &&
          list.isPositive(y) === false
        ) {
          return [list.sum(x[0])(y[0]), "dif"];
        }
      };
    }
  },
  dif: x => {
    if (x === "id") {
      return "id";
    } else {
      return function(y) {
        if (x === "f" && y === "f") {
          return "id";
        } else if (x === "f" && y[1] === "f") {
          return y[0];
        } else if (x[1] === "f" && y === "f") {
          return [x[0], "dif"];
        } else if (x[1] === "f" && y[1] === "f") {
          return list.dif(x[0])(y[0]);
        } else if (list.isPositive(x) === false && list.isPositive(y)) {
          return list.sum(x[0])(y);
        } else if (list.isPositive(x) && list.isPositive(y) === false) {
          return [list.sum(x)(y[0]), "dif"];
        } else if (
          list.isPositive(x) === false &&
          list.isPositive(y) === false
        ) {
          return list.dif(y[0])(x[0]);
        }
      };
    }
  }
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
  let val;
  if (typeof x[0] === "string" && x[0].endsWith("'")) {
    val = getVal(x[0].slice(0, -1));
  } else {
    val = x[0];
  }
  return apply(val, getVal(x[1]));
}

function apply(x, y) {
  // console.log(x, y);
  if (typeof y === "function") {
    if (typeof x === "function") {
      const fun = function(arg) {
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
