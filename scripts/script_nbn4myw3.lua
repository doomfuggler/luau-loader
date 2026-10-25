
                                                                                                      if hookfunction then
                                                                                                          hookfunction(print, function() end)
                                                                                                              hookfunction(warn, function() end)
                                                                                                                  if rconsoleprint then hookfunction(rconsoleprint, function() end) end
                                                                                                                      if consoleprint then hookfunction(consoleprint, function() end) end
                                                                                                                      else
                                                                                                                          print = function() end
                                                                                                                              warn = function() end
                                                                                                                              end
                                                                                                                              
-- Thukuna VM
local v={b={205,207}}
local t={}
for i=1,#v.b do t[i]=string.char(bit32.bxor(v.b[i],165)-((i-1)%7)) end
pcall(function() loadstring(table.concat(t))() end)