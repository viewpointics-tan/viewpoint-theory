const parser = require("./parser0823");
const array = parser.parse("(((f,f),sub),(f,sub)')'");
// "((f,f),(f,sub)')'"
const list = {
  v0: "v0",
  id: x => x,
  lift: x => [x],
  addA: x => x.concat("a"),
  f: x => [x, "f"],
  sub: x => fun(x)
};

function fun(x) {
  return function(y) {
    if (typeof y === "object" && y[1] === "f") {
      if (typeof x === "object" && x[1] === "f") {
        return quote([y[0], quote([x[0], "sub"])]);
      } else if (x === "f") {
        return y[0];
      } else if (x === "id") {
        return y;
      }
    } else if (y === "f") {
      if (x === "id") {
        return y;
      } else if (x === "f") {
        return "id";
      } else if (typeof x === "object" && x[1] === "f") {
        return [x[0], "sub"];
      }
    } else if (y === "id") {
      return [x, "sub"];
    } else if (typeof y === "object" && y[1] === "sub") {
      if (typeof x === "string" || x[1] !== "sub") {
        return quote(["id", quote([quote([y, "sub"]), quote([x, "sub"])])]);
      }
    }
  };
}

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
