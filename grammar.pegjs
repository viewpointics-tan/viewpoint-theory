any = nestedObj / nestedPos / nestedFun

nestedObj = space lp left:nestedObj con right:any rp {return `<obj>${left + right}</obj>`} / obj:obj {return obj}
nestedPos = space lp left:nestedPos con right:any rp {return `<pos>${left + right}</pos>`} / pos:pos {return pos}
nestedFun = space lp left:nestedFun con right:any rp {return `<fun>${left + right}</fun>`} / fun:fun {return fun}

lp = "(" space
con = "," space
rp = ")" space

obj = obj:([a-z] letter*) {let string =''; obj.flat().forEach(l=>{string += l}); return `<obj>${string}</obj>`}
pos = pos:([A-Z] letter*) {let string =''; pos.flat().forEach(l=>{string += l}); return `<pos>${string}</pos>`}
fun = fun:("_" letter*) {let string =''; fun.flat().forEach(l=>{string += l}); return `<fun>${string}</fun>`}

letter = [a-zA-Z0-9_]

space = [ \t\n\r]* {return ""}