const parser = require("./parser0823");
const array = parser.parse("(id,(((f,f),f),dif)')'");
// "((f,f),(f,sub)')'"
const list = {
  v0: "v0",
  id: x => x,
  lift: x => [x],
  addA: x => x.concat("a"),
  f: x => [x, "f"],
  dif: x =>
    function(y) {
      if (typeof x === "object" && x[1] === "f") {
        return list.dif(x[0])(list.dif(x[1])(y));
      } else if (typeof x[0] === "object" && x[1] === "dif") {
        return list.dif([x[0][0], "dif"])(list.dif([x[0][1], "dif"])(y));
      } else if (x === "f") {
        if (typeof y === "object" && y[1] === "f") {
          return y[0];
        } else if (y === "f") {
          return "id";
        } else if (y === "id") {
          return ["f", "dif"];
        } else if (typeof y === "object" && y[1] === "dif") {
          return [[y[0], "f"], "dif"];
        }
      } else if (x[0] === "f" && x[1] === "dif") {
        if (typeof y[0] === "object" && y[1] === "dif") {
          return [y[0], "dif"];
        } else if (y[0] === "f" && y[1] === "dif") {
          return "id";
        } else if (y === "id") {
          return "f";
        } else {
          return [y, "f"];
        }
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
