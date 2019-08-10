result = formula:formula {let string =''; formula.forEach(l=>{string += l}); return string}

formula = space formula:(lp formula con formula rp / word) {const array = [formula].flat(2); return array}

lp = "(" space {return "<par>"}

con = "," space {return "" }

rp = ")" space {return "</par>"}

word = obj / pos / fun

obj = obj:([a-z] letter*) {let string =''; obj.flat().forEach(l=>{string += l}); return `<obj>${string}</obj>`}

pos = pos:([A-Z] letter*) {let string =''; pos.flat().forEach(l=>{string += l}); return `<pos>${string}</pos>`}

fun = fun:("_" letter*) {let string =''; fun.flat().forEach(l=>{string += l}); return `<fun>${string}</fun>`}

letter = [a-zA-Z0-9_]

space = [ \t\n\r]*