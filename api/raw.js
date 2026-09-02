export default async function handler(req, res) {
  const { id } = req.query;
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();
  
  const host = req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const rawUrl = `${protocol}://${host}/api/raw?id=${id || ''}`;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  // Detect genuine Roblox Executors vs Web Browsers
  const isRobloxExecutor = userAgent.includes('roblox') || 
                           userAgent.includes('delta') || 
                           userAgent.includes('executor') || 
                           userAgent.includes('curl') ||
                           !userAgent.includes('mozilla');

  if (!isRobloxExecutor && (userAgent.includes('chrome') || userAgent.includes('safari') || userAgent.includes('edge'))) {
    return res.status(200).send(`loadstring(game:HttpGet("${rawUrl}"))()`);
  } 

  if (!id) {
    return res.status(200).send('warn("Vercel Loader: Missing Script ID in request")');
  }

  try {
    // Check main and preview domains
    let response = await fetch(`https://luna-script-shield.base44.app/api/script/${id}`);
    if (!response.ok) {
      response = await fetch(`https://preview--luna-script-shield.base44.app/api/script/${id}`);
    }

    if (!response.ok) {
      return res.status(200).send(`warn("Vercel Loader Error: Script ID '${id}' not found in Base44 database.")`);
    }

    const responseText = await response.text();
    
    try {
      const json = JSON.parse(responseText);
      const rawCode = json.code || json.script || json.data || responseText;
      return res.status(200).send(rawCode);
    } catch {
      return res.status(200).send(responseText);
    }
  } catch (error) {
    return res.status(200).send('warn("Vercel Loader Error: Failed to connect to Base44 server.")');
  }
}
