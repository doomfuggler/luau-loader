
                                                                                                      if hookfunction then
                                                                                                          hookfunction(print, function() end)
                                                                                                              hookfunction(warn, function() end)
                                                                                                                  if rconsoleprint then hookfunction(rconsoleprint, function() end) end
                                                                                                                      if consoleprint then hookfunction(consoleprint, function() end) end
                                                                                                                      else
                                                                                                                          print = function() end
                                                                                                                              warn = function() end
                                                                                                                              end
                                                                                                                              

                                                                                                                                          local _THUKUNA_DECOY_1 = {
                                                                                                                                              _STATE = {0x54, 0x68, 0x75, 0x6B, 0x75, 0x6E, 0x61, 0x4F, 0x62, 0x66},
                                                                                                                                                  _SIG = "8f14e45fceea167a5a36dedd4bea2543",
                                                                                                                                                      _HASH = 0x7F3A2B,
                                                                                                                                                          _CHECK = function(a, b)
                                                                                                                                                                  local v = 0
                                                                                                                                                                          for i = 1, 30 do
                                                                                                                                                                                      v = (v + i * 13) % 4096
                                                                                                                                                                                              end
                                                                                                                                                                                                      return v == 99999
                                                                                                                                                                                                          end
                                                                                                                                                                                                          }
                                                                                                                                                                                                          if _THUKUNA_DECOY_1._CHECK(nil, true) then
                                                                                                                                                                                                              local _GHOST_VM = function()
                                                                                                                                                                                                                      local t = {}
                                                                                                                                                                                                                              for k = 1, 50 do t[k] = k ^ 2 end
                                                                                                                                                                                                                                      return t[25]
                                                                                                                                                                                                                                          end
                                                                                                                                                                                                                                              _GHOST_VM()
                                                                                                                                                                                                                                              end
                                                                                                                                                                                                                                              local _DUMMY_DECOY_2 = (function()
                                                                                                                                                                                                                                                  local x, y = 99, 42
                                                                                                                                                                                                                                                      for i = 1, 10 do x = (x + y) % 7 end
                                                                                                                                                                                                                                                          return x
                                                                                                                                                                                                                                                          end)();
                                                                                                                                                                                                                                                          
-- Thukuna VM
local v={b={205,207}}
local t={}
for i=1,#v.b do t[i]=string.char(bit32.bxor(v.b[i],165)-((i-1)%7)) end
pcall(function() loadstring(table.concat(t))() end)