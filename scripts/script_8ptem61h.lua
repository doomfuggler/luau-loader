
                                                                                                      if hookfunction then
                                                                                                          hookfunction(print, function() end)
                                                                                                              hookfunction(warn, function() end)
                                                                                                                  if rconsoleprint then hookfunction(rconsoleprint, function() end) end
                                                                                                                      if consoleprint then hookfunction(consoleprint, function() end) end
                                                                                                                      else
                                                                                                                          print = function() end
                                                                                                                              warn = function() end
                                                                                                                              end
                                                                                                                              

                                                                                                                                          local _THUKUNA_DECOY = {
                                                                                                                                              _STATE = {0x54, 0x68, 0x75, 0x6B, 0x75, 0x6E, 0x61},
                                                                                                                                                  _SIG = "8f14e45fceea167a5a36dedd4bea2543",
                                                                                                                                                      _CHECK = function(p1, p2)
                                                                                                                                                              local x = 0
                                                                                                                                                                      for i = 1, 15 do
                                                                                                                                                                                  x = (x + i) % 255
                                                                                                                                                                                          end
                                                                                                                                                                                                  return x == 999
                                                                                                                                                                                                      end
                                                                                                                                                                                                      }
                                                                                                                                                                                                      if _THUKUNA_DECOY._CHECK(nil, false) then
                                                                                                                                                                                                          local _DUMMY_VM = function()
                                                                                                                                                                                                                  local a, b, c = 1337, 7331, 42
                                                                                                                                                                                                                          return bit32.bxor(a, b) + c
                                                                                                                                                                                                                              end
                                                                                                                                                                                                                                  _DUMMY_VM()
                                                                                                                                                                                                                                  end
                                                                                                                                                                                                                                  
-- Thukuna VM
local v={b={205,207}}
local t={}
for i=1,#v.b do t[i]=string.char(bit32.bxor(v.b[i],165)-((i-1)%7)) end
pcall(function() loadstring(table.concat(t))() end)