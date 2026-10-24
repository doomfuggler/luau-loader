-- Thukuna VM
local v={b={213,214,206,212,221,136,141,205,207,129,137}}
local t={}
for i=1,#v.b do t[i]=string.char(bit32.bxor(v.b[i],165)-((i-1)%7)) end
pcall(function() loadstring(table.concat(t))() end)