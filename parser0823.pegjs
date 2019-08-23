formula = "(" l:(formula/pair) "," r:(formula/pair) ")" p:prime? {return [l,r,p]}

pair = "(" l:word "," r:word ")" {return [l,r]}/ w:word {return w}

word = a:letter+ {let st=""; a.forEach(l=>{st += l}); return st}

prime = "'"

letter = [a-zA-Z0-9_]

_ "whitespace"
  = [ \t\n\r]*