-- Thukuna VM
local v={b={193}}
local t={}
for i=1,#v.b do t[i]=string.char(bit32.bxor(v.b[i],165)-((i-1)%7)) end
pcall(function() loadstring(table.concat(t))() end)