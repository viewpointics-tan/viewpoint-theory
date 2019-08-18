any = nestedObj / nestedPos / nestedFun

nestedObj = space lp left:nestedObj con right:any rp {return `{obj:[${left},${right}]}`} / obj:obj {return obj}
nestedPos = space lp left:nestedPos con right:any rp {return `{pos:[${left},${right}]}`} / pos:pos {return pos}
nestedFun = space lp left:nestedFun con right:any rp {return `{fun:[${left},${right}]}`} / fun:fun {return fun}

lp = "(" space
con = "," space
rp = ")" space

obj = obj:([a-z] letter*) {let string =''; obj.flat().forEach(l=>{string += l}); return `{obj:${string}}`}
pos = pos:([A-Z] letter*) {let string =''; pos.flat().forEach(l=>{string += l}); return `{pos:${string}}`}
fun = fun:("_" letter*) {let string =''; fun.flat().forEach(l=>{string += l}); return `{fun:${string}}`}

letter = [a-zA-Z0-9_]

space = [ \t\n\r]* {return ""}