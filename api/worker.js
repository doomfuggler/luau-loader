/**
 * ThukunaObfuscator Engine — Single-File Cloudflare Worker
 */

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key, X-Admin-Email, X-Roblox-Secret-Key"
};

const GH_OWNER = "doomfuggler";
const GH_REPO = "luau-loader";
const GH_BRANCH = "main";
const WEB_KEY = "thukuna_public_api_key";
const ROBLOX_SECRET_KEY = "thukuna_roblox_secret_9981";
const ADMIN_EMAILS = ["doomfuggler@gmail.com", "211227@web.wfjlps.edu.hk"];
const EXECS = ["roblox", "okhttp", "dalvik", "libcurl", "curl", "winhttp", "wininet", "go-http-client", "wave", "solora", "synapse", "krnl", "scriptware", "script-ware", "electron", "celery", "swift", "awp", "xeno", "sora", "subzero", "oxygen", "comet", "sentinel", "protosmasher", "sirhurt", "jjsploit", "trigon", "delta", "hydrogen", "codex", "arceus", "fluxus", "vega", "evon", "appleware", "cubix", "cryptic"];

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...CORS } });
}

function localVmFallback(code) {
  const bytes = new TextEncoder().encode(code);
  const k1 = 42, k2 = 19;
  const enc = Array.from(bytes).map((b, i) => `(((${b ^ k1} + ${i * 3} + ${k2}) - ${i * 3} - ${k2}) ^ ${k1})`);
  return `local t={${enc.join(",")}};local o={};for i=1,#t do o[i]=string.char(t[i]) end;return (loadstring or load)(table.concat(o))()`;
}

async function obfuscateLuau(code, env) {
  const key = env?.LUAOBF_API_KEY || "57247412-a025-2550-1da-ae9a5dbd48c69c07";
  try {
    const res = await fetch("https://api.luaobfuscator.com/v1/obfuscator/newscript", {
      method: "POST", headers: { "apikey": key, "Content-Type": "text/plain" }, body: code
    });
    if (res.ok) {
      const sData = await res.json();
      if (sData?.sessionId) {
        const oRes = await fetch("https://api.luaobfuscator.com/v1/obfuscator/obfuscate", {
          method: "POST", headers: { "apikey": key, "sessionId": sData.sessionId, "Content-Type": "application/json" },
          body: JSON.stringify({ MinifyAll: true, CustomPlugins: { ControlFlowFlattenV2AllBlocks: [100], EncryptStrings: [100] } })
        });
        if (oRes.ok) {
          const fData = await oRes.json();
          if (fData?.code) return { code: fData.code, tier: "LuaObfuscator API" };
        }
      }
    }
  } catch (e) {}
  return { code: localVmFallback(code), tier: "6-Tier VM Engine" };
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === "OPTIONS") return new Response(null, { headers: CORS });

    if (url.pathname === "/" || url.pathname === "/index.html") {
      const html = `<!DOCTYPE html><html><head><title>ThukunaObfuscator</title><style>body{background:#0d1117;color:#c9d1d9;font-family:sans-serif;display:flex;justify-content:center;padding:20px;}.card{background:#161b22;border:1px solid #30363d;padding:20px;border-radius:10px;width:100%;max-width:600px;}textarea{width:100%;height:140px;background:#0d1117;border:1px solid #30363d;color:#fff;padding:10px;border-radius:6px;margin:10px 0;}button{width:100%;padding:12px;background:#238636;color:#fff;border:none;border-radius:6px;font-weight:bold;cursor:pointer;}.box{background:#0d1117;border:1px solid #30363d;padding:10px;border-radius:6px;font-family:monospace;font-size:0.75rem;color:#79c0ff;word-break:break-all;margin-top:10px;}</style></head><body><div class="card"><h2>ThukunaObfuscator</h2><p id="st" style="color:#8b949e;font-size:0.85rem;">Ready</p><div id="res" style="display:none;" class="box"><code id="ls"></code></div><textarea id="sc" placeholder="Paste script..."></textarea><button onclick="obf()">🛡️ Obfuscate Script</button></div><script>async function obf(){const s=document.getElementById('sc').value;const r=await fetch('/api/obfuscate',{method:'POST',headers:{'Content-Type':'application/json','X-API-Key':'thukuna_public_api_key'},body:JSON.stringify({script:s})});const d=await r.json();if(d.success){document.getElementById('st').textContent='Success via '+d.tier;document.getElementById('ls').textContent=d.loadstring;document.getElementById('res').style.display='block';}else{alert(d.error);}}</script></body></html>`;
      return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8", ...CORS } });
    }

    if (url.pathname.startsWith("/raw/")) {
      const id = url.pathname.replace("/raw/", "").trim();
      const ua = (req.headers.get("User-Agent") || "").toLowerCase();
      if (!EXECS.some(e => ua.includes(e))) return new Response("Access Denied", { status: 403 });
      if (env.LUAU_KV) {
        const val = await env.LUAU_KV.get(`script:${id}`);
        if (val) return new Response(val, { headers: { "Content-Type": "text/plain", ...CORS } });
      }
      return new Response("Not found", { status: 404 });
    }

    if (url.pathname === "/api/obfuscate" && req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      const ua = (req.headers.get("User-Agent") || "").toLowerCase();
      const isRoblox = EXECS.some(e => ua.includes(e));

      if (isRoblox) {
        const email = (req.headers.get("X-Admin-Email") || body.adminEmail || "").toLowerCase();
        const secret = req.headers.get("X-Roblox-Secret-Key") || body.robloxSecret;
        if (!ADMIN_EMAILS.includes(email) && secret !== ROBLOX_SECRET_KEY) {
          return json({ error: "Unauthorized Roblox Access" }, 403);
        }
      } else {
        const key = req.headers.get("X-API-Key") || body.apiKey;
        if (key !== (env?.API_KEY || WEB_KEY)) return json({ error: "Unauthorized Web Key" }, 401);
      }

      if (!body.script) return json({ error: "Missing script" }, 400);

      const res = await obfuscateLuau(body.script, env);
      const id = "thukuna_" + Math.random().toString(36).substring(2, 10);

      if (env.LUAU_KV) await env.LUAU_KV.put(`script:${id}`, res.code);

      const token = env?.GH_TOKEN || env?.GITHUB_TOKEN;
      if (token) {
        await fetch(`https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/scripts/${id}.lua`, {
          method: "PUT",
          headers: { "Authorization": `Bearer ${token}`, "User-Agent": "Worker", "Content-Type": "application/json" },
          body: JSON.stringify({ message: `Upload ${id}`, content: btoa(res.code), branch: GH_BRANCH })
        }).catch(() => {});
      }

      return json({ success: true, loadstring: `loadstring(game:HttpGet("https://luau-shield.doomfuggler.workers.dev/?id=${id}"))()`, tier: res.tier });
    }

    return new Response("Not Found", { status: 404, headers: CORS });
  }
};
