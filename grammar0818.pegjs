formula = nestedVal/nestedPos/vp/pv

nestedVal = space vp:vp qu {return {"val":Object.assign(vp,{"eva":true})}} / val
nestedPos = space pv:pv qu {return {"pos":Object.assign(pv,{"eva":true})}} / pos

vp = lp left:(nestedVal/vp) con right:(nestedPos/pv) rp {return {"vp":[left,right]}} / lp pos:nestedPos rp {return {"vp":pos}} 
pv = lp left:(nestedPos/pv) con right:(nestedVal/vp) rp {return {"pv":[left,right]}}

val = lp pos:pos rp qu {return {"val":Object.assign(pos,{"eva":true})}}

lp = "(" space
con = "," space
rp = ")" space
qu = "'" space

pos = pos:([a-z] letter*) {let string =''; pos.flat().forEach(l=>{string += l}); return {"pos":string}}
fun = fun:("_" letter*) {let string =''; fun.flat().forEach(l=>{string += l}); return {"fun":string}}

letter = [a-zA-Z0-9_]

space = [ \t\n\r]* {return ""}