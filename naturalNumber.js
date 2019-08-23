const list = {
  v0: "v0",
  id: x => x,
  addq: x => x + "q",
  lift: x => [x],
  f: x => [x, "f"]
};

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

const one = ["v0", "f"];
const two = ["v0", quote(["f", "f"])];
console.log(quote(["f", quote(["f", "f"])]));

const text = "(f,(f,f)')'"
